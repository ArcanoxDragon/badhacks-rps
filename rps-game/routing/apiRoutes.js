// DATA AREA

var users = require('../config/orm.js');

// ==========
// ROUTING
// ==========

module.exports = function(app){
	app.get('/post/start-game' function(req, res) {
		res.json(users);
	});
	
	app.post('/post/start-game', function(req, res){
		res.send(req.body);
		// users.push(req.body);
	});
}


// rows.length > 0
// row will either be null or it will be the user 


// SELECT * FROM users WHERE id = 