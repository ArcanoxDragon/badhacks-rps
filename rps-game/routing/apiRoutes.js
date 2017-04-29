// DATA AREA

var users = require('../data/users');

// ==========
// ROUTING
// ==========
module.exports = function(app){
	app.get('/api/', function(req, res) {
		res.json(users);
	});
	
	app.post('/api/', function(req, res){
		res.send(req.body);
		users.push(req.body);
	});
}

