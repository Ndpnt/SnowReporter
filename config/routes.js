var users = require('../app/controllers/users_controller');
var hills = require('../app/controllers/hills_controller');

module.exports = function(app) {
	app.get('/hills/' 	 	, function(req, res) { hills.index(req, res) });
	app.get('/hills/:name'  , function(req, res) { hills.show(req, res)  });
	
	app.get('/'		  	 	, function(req, res) { users.index(req, res) });
}