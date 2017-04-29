var express 	= require('express');
var bodyParser 	= require('body-parser');
var exphbs 		= require("express-handlebars");
var app 		= express();
var path 		= require('path');
var PORT 		= process.env.PORT || 7002;
var orm 		= require("./config/orm.js");

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// app.use(express.static('./public'));

// Service 2 (Game Service)

// 1. check to make sure sessionid exists in users table
// 2. check to make sure friendname exists in users table
// 3. get second sessionid from users table using friendname
// 4. generate uid(16) for gameid
// 5. put both sessionids and gameid into games table


orm.selectAll();

app.listen(PORT, function() {
	console.log('App listening on PORT ' + PORT);
});