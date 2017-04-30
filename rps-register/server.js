//Dependendices 
var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var uid = require("uid");

var app = express();
var PORT = 7001;

app.use(bodyParser.json());

var connection = mysql.createConnection({
  host: "arcanox.me",
  user: "badhacks-rps",
  password: "badhacks2017",
  database: "badhacks-rps"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});


app.post("/register", function(req, res) {
	if ( !req.body.username ) return res.status(400).send("username is required");
	
	var user = {
		username: req.body.username,
		sessionid: uid(16)
	}

	console.log(user);

	var delQuery = "DELETE FROM users WHERE username = ?";
	connection.query(delQuery, [user.username], function(err) {
		if (err) throw err;

		var insQuery = "INSERT INTO users (username, sessionid) VALUES(?, ?)";
		connection.query(insQuery, [user.username, user.sessionid], function(err) {
			console.log("User added successfully");

			res.send({ "sessionid": user.sessionid });
		});
	});

});


app.listen(PORT, function() {
	console.log("Register listening on " + PORT);
});