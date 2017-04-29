var mysql = require( "mysql" );

var dbConfig = {
    // host: "arcanox.me",
    // port: 3306,
    host: "localhost",
    port: 3307,
    user: "badhacks-rps",
    password: "badhacks2017",
    database: "badhacks-rps"
};

console.log( "Connecting to MySQL database..." );

var db = mysql.createConnection( dbConfig );

console.log( "Connected." );

function runQuery( query, params ) {
    return new Promise(( res, rej ) => {
        let callback = ( err, result ) => {
            if ( err ) return rej( { status: 500, message: `Internal server error: ${err.message}` } );

            res( result );
        };

        if ( params )
            db.query( query, params, callback );
        else
            db.query( query, callback );
    } );
}

module.exports = {
    getGame( sessionId ) {
        return runQuery( "SELECT * FROM games WHERE session1 = ? OR session2 = ?", [ sessionId, sessionId ] );
    },

    getUser( sessionId ) {
        return runQuery( "SELECT * FROM users WHERE sessionid = ?", [ sessionId ] );
    }
}