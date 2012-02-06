var users = require('./app/controllers/users_controller');
var hills = require('./app/controllers/hills_controller');

exports.hills_index = function(req, res) {
	res.render('hills/index', hills.index(req, res));
};

exports.users_index = function(req, res) {
	if(req.loggedIn) {
		res.render('users/index', users.index(req.loggedIn));		
	} else {
  		res.render('users/login', users.index(req.loggedIn));				
	}
};