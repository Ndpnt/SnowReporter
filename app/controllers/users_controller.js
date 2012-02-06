exports.index = function(logged) {
	if(logged) {
  		return { title: 'Vous êtes bien connecté (user)' };
	} else {
  		return { title: "Veuillez vous connecter avant d'acceder à cette page", email: "Lalal" };
	}
};