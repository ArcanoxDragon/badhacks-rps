var express = require( "express" );
var browserify = require( "browserify-middleware" );
var babelify = require( "babelify" );
var path = require( "path" );
var sass = require( "node-sass-middleware" );

const commonModules = [
    "jquery",
    "toastr",
    "js-cookie"
];

const servicesConfig = require("./config/services.json");

var viewsDir = path.join( __dirname, "views" );
var app = express();

app.set( "view engine", "pug" );
app.set( "views", viewsDir );

app.locals.basedir = viewsDir;
app.locals.services = servicesConfig;

app.use( sass( {
    src: path.join( __dirname, "styles" ),
    dest: path.join( __dirname, "static/css" ),
    prefix: "/css",
    outputStyle: "nested",
    force: true
} ) );

app.get( "/js/common.js", browserify( commonModules, {
    minify: true,
    transform: "babelify"
} ) );

app.use( "/js", browserify( path.join( __dirname, "client" ), {
    basedir: "/js",
    external: commonModules,
    cache: false,
    minify: false,
    precompile: false,
    transform: babelify
} ) );

app.get( "/", ( req, res ) => res.render( "pages/index" ) );

app.listen( 7010, () => {
    console.log( "Listening on port 7010" );
} );