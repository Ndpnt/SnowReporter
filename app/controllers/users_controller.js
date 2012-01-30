exports.index = function(req, res) {
	if(req.loggedIn) {
  		res.render('index', { title: 'Vous êtes bien connecté (user)' })		
	} else {
  		res.render('login', { title: "Veuillez vous connecter avant d'acceder à cette page", email: "" })				
	}
};