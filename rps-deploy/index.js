var path = require( "path" );
var cp = require( "child_process" );
var config = require( "./services.json" );

function npmInstall( p ) {
    return new Promise( res => {
        let child = cp.spawn( "npm install", { cwd: path.join( __dirname, p ), shell: true } );
        child.on( "close", res );
    } );
}

Promise
    .all( config.services.map( s => npmInstall( s ) ) )
    .then(() => {
        config.services.forEach( s => {
            cp.fork( s, { cwd: path.join( __dirname, s ) } );
        } );
    } );