var users = require('../app/controllers/users_controller');
var hills = require('../app/controllers/hills_controller');

module.exports = function(app) {
	function restrict(req, res, next) {
	  if (req.loggedIn) {
	  	next();
	  } else {
	    req.session.error = 'Access denied!';
		console.log("\n" + '***************************************');
		console.log(req.session.error);
		console.log('***************************************' + "\n");
	    res.redirect('/users/login');
	  }
	}
	
	app.get('/hills/' 	 	, restrict, hills.index);
	app.get('/hills/:name'  , 			hills.show);
	app.get('/'		  	 	, 			users.index);
}