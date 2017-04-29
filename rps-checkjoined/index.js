var express = require( "express" );
var bodyParser = require( "body-parser" );
var db = require( "./sql" );

var app = express();

app.use( bodyParser.json() );

app.post( "/ingame", ( req, res ) => {
    if ( !req.body )
        return res.status( 400 /* Bad Request */ ).send( "Request body missing" );

    let { sessionid } = req.body;
    let gameId;

    if ( !sessionid )
        return res.send( 400 /* Bad Request */ ).send( "Missing parameter" );

    db
        .getUser( sessionid )
        .then( rows => {
            if ( !rows || rows.length === 0 )
                throw { status: 404, message: "Session not found" };
        } )
        .then(() => db.getGame( sessionid ) )
        .then( rows => {
            if ( !rows || rows.length === 0 )
                throw { status: 200, message: { inGame: false } }; // just return this

            let game = rows[ 0 ];
            let otherUserSession;

            gameId = game.gameid;

            if ( game.session1 === sessionid )
                otherUserSession = game.session2;
            else
                otherUserSession = game.session1;

            return otherUserSession;
        } )
        .then( db.getUser )
        .then( rows => {
            if ( !rows || rows.length === 0 )
                throw { status: 404, message: "The other user in your game has disappeared" };

            let otherUser = rows[ 0 ];

            res.status( 200 ).send( {
                inGame: true,
                gameId,
                otherUserName: otherUser.username
            } );
        } )
        .catch( err => {
            res.status( err.status || 500 ).send( err.message );
        } );
} );

app.use(( req, res, next ) => {
    res.status( 404 ).send( "Not Found" );
} );

app.use(( err, req, res, next ) => {
    if ( err ) return res.status( 500 ).send( "Internal server error" );

    return res.status( 200 ).send();
} );

app.listen( 7004 );