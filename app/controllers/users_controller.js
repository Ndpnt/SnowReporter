var backToLogin = function(req, res, next){
    req.session.error = 'Access denied!';
   	console.log("\n" + '***************************************');
   	console.log(req.session.error);
   	console.log('***************************************' + "\n");
    req.flash('error', 'Vous devez être connecté pour pouvoir continuer');
    res.redirect('/users/login');
}

var forbidden = function(req, res, next){
    req.session.error = 'Access denied!';
   	console.log("\n" + '***************************************');
   	console.log(req.session.error);
   	console.log('***************************************' + "\n");
    req.flash('error', 'Accès interdit');
    res.redirect('/');
}

exports.restrict = function(req, res, next) {	   
  if (req.loggedIn) {
    next();
  } else {
    backToLogin(req, res, next);
  }
}

exports.restrictForQualifedUser = function(req, res, next) {
  if(req.user.skimaster) {
    next();
  } else {
    var stop = true;
    if(req.route.method === 'put' || req.route.method === 'post' ) {
      req.params.id = req.body.hill_id;
    }
    Hill.findById(req.params.id, function (err, hill) {
      var i;
      for(i = 0; i < hill.qualified_users.length; i++ ) {
        if(hill.qualified_users[i] === req.user.email) { stop = false; }
      }
      if(!stop) { next(); } else { forbidden(req, res, next); }
    });
  }
}