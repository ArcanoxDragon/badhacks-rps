var mysql 		= require('mysql');
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

module.exports = connection;