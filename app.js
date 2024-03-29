/**-------------- Module dependencies --------------**/
var mongoose 	 = require('mongoose')
    Schema 		 = mongoose.Schema,
    mongooseAuth = require('mongoose-auth'),
    everyauth 	 = require('everyauth'),
    Promise 	 = everyauth.Promise,
    express 	 = require('express');

mongoose.connect('mongodb://localhost/snow_reporter');

/**-------------- MODELS --------------**/
require('./app/models/user');
User = mongoose.model('User');

require('./app/models/hill');
Hill = mongoose.model('Hill');


/**-------------- APP --------------**/
var app = module.exports = express.createServer();
var sockets = require('./app/controllers/sockets_controller').setup(app);
require('./config/environment.js')(app, express);

app.dynamicHelpers({
  messages: require('express-messages')
});

/**-------------- ROUTES -------------**/
require('./config/routes.js')(app);


/**-------------- START --------------**/
mongooseAuth.helpExpress(app);
app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
