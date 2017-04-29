// ============
// DEPENDENCIES
// ============
var path = require ('path');

// ============
// ROUTING
// ============
path.resolve('../../public');

module.exports = function(app) {
	app.get('/', function(req, res) {
		res.sendFile('home.html', {root: './app/public'});
	});

	app.get('/signup', function(req, res) {
		res.sendFile(path.join(__dirname, '/../public/signup.html'))
	});
	
	app.use(function(req, res){
		res.sendFile('home.html', {root: './app/public'});
	});

};