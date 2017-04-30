var express 	= require('express');
var bodyParser 	= require('body-parser');
var exphbs 		= require("express-handlebars");
var app 		= express();
var uid 		= require('uid');
var PORT 		= process.env.PORT || 7002;
var orm 		= require("./config/orm.js");
var mysql 		= require('mysql');
var cors		= require('cors');

app.use(cors());
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
	
	// variables
	var session = req.body.sessionid;		
	var friend = req.body.friendname;
	var gameid = uid(16);
	var session1 = session;
	
	if (!session) return res.status(400).send('sessionid is required');
	if (!friend) return res.status(400).send('friendname is required');

	var checkQueryPlayer1 = "SELECT * FROM users WHERE sessionid = ?";
	connection.query(checkQueryPlayer1, [session], function(err, rows) {	
		console.log('the first set of rows', rows);
		if (err) throw err;
		if (!(rows && rows.length > 0)) {
			res.status(404).send("Your session is not valid");
			return;
		};
		
		var checkQueryPlayer2 = "SELECT * FROM users WHERE username = ?";
		connection.query(checkQueryPlayer2, [friend], function(err, rows) {
			console.log('this the second set of rows', rows)

			if (err) throw err;
			if (!(rows && rows.length > 0)) {
				res.status(404).send("Your friend has not registered");
				return;

			};
			var player2 = rows[0];
			var session2 = player2.sessionid;

			var checkQuery = "Insert INTO games(gameId, session1, session2) VALUES (?,?,?)";
			connection.query(checkQuery, [gameid, session1, session2], function(err) {
				res.send({ gameid: gameid, othersession: session2 })
			});
		});
	});
	
});

// Service 2 (Game Service)

// 1. check to make sure sessionid exists in users table
// 2. check to make sure friendname exists in users table
// 3. get second sessionid from users table using friendname
// 4. generate uid(16) for gameid
// 5. put both sessionids and gameid into games table

app.listen(PORT, function() {
	console.log('App listening on PORT ' + PORT);
});