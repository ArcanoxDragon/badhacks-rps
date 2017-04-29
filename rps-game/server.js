var express 	= require('express');
var bodyParser 	= require('body-parser');
var exphbs 		= require("express-handlebars");
var app 		= express();
// var path 		= require('path');
var PORT 		= process.env.PORT || 7002;
var orm 		= require("./config/orm.js");
var mysql 		= require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

var connection 	= mysql.createConnection({
	host: 'arcanox.me',
	user: 'badhacks-rps',
	password: 'badhacks2017',
	database: 'badhacks-rps'
});

connection.connect(function(err) {
 	if (err) {
		console.error("error connecting: " + err.stack);
		return;
	}
  	console.log("connected as id " + connection.threadId);
});

app.post('/start-game', function(req, res){
	if (!req.body.username) return res.status(400).send('user is required');
	
	// variables
	var session = req.body.sessionid;		
	var friend = req.body.friendname;
	var gameid = uid(16);
	var session1 = session;
	var session2 = player2.sessionid

	var checkQueryPlayer1 = "SELECT * FROM users WHERE sessionid = ?";
	connection.query(checkQueryPlayer1, [session], function(err) {	
		if (err) throw err;
		if (return rows && rows.length > 0);
	});
	
	var checkQueryPlayer2 = "SELECT * FROM users WHERE username = ?";
	connection.query(checkQueryPlayer2, [friend], function(err) {
		if (err) throw err;
		if (return rows && rows.length > 0);
		return player2 = rows[0];
	});
	
	var checkQuery = "Insert INTO games(gameId, session1, session2) VALUES (?,?,?)";
	connection.query(checkQuery, [gameid, session1, session2], function(err) {
		
	});
}

// Service 2 (Game Service)

// 1. check to make sure sessionid exists in users table
// 2. check to make sure friendname exists in users table
// 3. get second sessionid from users table using friendname
// 4. generate uid(16) for gameid
// 5. put both sessionids and gameid into games table

app.listen(PORT, function() {
	console.log('App listening on PORT ' + PORT);
});