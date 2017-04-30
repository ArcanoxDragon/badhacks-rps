var express = require( "express" );
var bodyParser = require( "body-parser" );
var db = require( "./sql" );
var cors = require("cors");

var app = express();

app.use(cors());
app.use( bodyParser.json() );

app.post( "/choose", ( req, res ) => {
    if ( !req.body )
        return res.status( 400 /* Bad Request */ ).send( "Request body missing" );

    let { choice, sessionid } = req.body;
    let chosen;

    if ( !choice || !sessionid )
        return res.send( 400 /* Bad Request */ ).send( "Missing parameter" );

    db
        .checkSession( sessionid )
        .then( valid => {
            if ( !valid ) throw { status: 400, message: "Session invalid or not in a game" };
        } )
        .then(() => db.getValidChoices() )
        .then( choiceRows => {
            var choices = {};

            choiceRows.forEach( row => {
                choices[ row.name.toLowerCase() ] = parseInt( row.id );
            } );

            chosen = choices[ choice.toLowerCase() ];

            if ( !chosen )
                throw { status: 404, message: "No such response type" };
        } )
        .then(() => db.clearChoices( sessionid ) )
        .then(() => db.insertChoice( sessionid, chosen ) )
        .then(() => res.status( 200 ).send() )
        .catch( err => {
            res.status( err.status ).send( err.message );
        } );
} );

app.listen( 7003 );