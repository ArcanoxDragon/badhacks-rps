var connection = require("./connection.js");

var orm = {
	selectAll: function() {
		var queryString = "SELECT * FROM games";
		
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}
			console.log(result);
		});
	}
};

module.exports = orm;