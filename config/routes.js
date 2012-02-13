var users = require('../app/controllers/users_controller');
var hills = require('../app/controllers/hills_controller');

module.exports = function(app) {
  function backToLogin(req, res, next){
      req.session.error = 'Access denied!';
	   	console.log("\n" + '***************************************');
	   	console.log(req.session.error);
	   	console.log('***************************************' + "\n");
      req.flash('error', 'You must be logged before continue');
      res.redirect('/users/login');
  }
  
  function forbidden(req, res, next){
      req.session.error = 'Access denied!';
	   	console.log("\n" + '***************************************');
	   	console.log(req.session.error);
	   	console.log('***************************************' + "\n");
      req.flash('error', 'Acces forbidden');
      res.redirect('/');
  }

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
	
  function restrictForQualifedUser(req, res, next) {
    if(req.user.skimaster) {
      next();
    } else {
      var stop = true;
      Hill.findById(req.params.id, function (err, hill) {
        var i;
        for(i = 0; i < hill.qualified_users.length; i++ ) {
          if(hill.qualified_users[i] === req.user.email) { stop = false; }
        }
        if(!stop) { next(); } else { forbidden(req, res, next); }
      });
    }
  }

	// Resources for Hills
	app.get('/hills'            ,                                    hills.index);
	app.get('/hills/new'        , restrict,                          hills.new);
	app.get('/hills/:id/edit'   , restrict, restrictForQualifedUser, hills.edit);
	app.post('/hills/create'    , restrict,                          hills.create);
	app.post('/hills/comment'   ,                                    hills.comment);
	app.post('/hills/update'    , restrict, restrictForQualifedUser, hills.update);
	app.post('/hills/destroy'   , restrict, restrictForQualifedUser, hills.destroy);
	app.get('/hills/:id'        , 			                             hills.show);
	app.get('/'		  	 	        , 			                             hills.index);

}