var users = require('../app/controllers/users_controller');
var hills = require('../app/controllers/hills_controller');

module.exports = function(app) {

	// Resources for Hills
	app.get('/hills'            ,                                                hills.index);
	app.get('/hills/new'        , users.restrict,                                hills.new);
	app.get('/hills/:id/edit'   , users.restrict, users.restrictForQualifedUser, hills.edit);
	app.post('/hills/create'    , users.restrict,                                hills.create);
	app.post('/hills/comment'   ,                                                hills.comment);
	app.post('/hills/update'    , users.restrict, users.restrictForQualifedUser, hills.update);
	app.post('/hills/destroy'   , users.restrict, users.restrictForQualifedUser, hills.destroy);
	app.get('/hills/:id'        , 			                                         hills.show);
	app.get('/'		  	 	        , 			                                         hills.index);

}