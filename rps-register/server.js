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

	var user = {
		username: req.body.username,
		sessionid: uid(16)
	}

	console.log(user);

	var query = [
		"DELETE FROM users WHERE username = ?;",
		"INSERT INTO users (username, sessionid) VALUES(?, ?);"
		].join(" ");
	connection.query(query, [user.username, user.username, user.sessionid], function(err) {
		if (err) throw err;
		console.log("User successfully added");

	res.send({ "sessionid": user.sessionid });

	});
});





app.listen(PORT, function() {
	console.log("Is this working?");
});