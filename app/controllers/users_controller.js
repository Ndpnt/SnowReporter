exports.index = function(req, res) {
	if(req.loggedIn) {
  		res.render('users/index', { title: 'Vous êtes bien connecté (user)' })		
	} else {
  		res.render('users/login', { title: "Veuillez vous connecter avant d'acceder à cette page", email: "" })				
	}
};