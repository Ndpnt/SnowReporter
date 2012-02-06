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

// Configuration
app.configure(function () {
    app.set('views', __dirname + '/app/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({ secret:"keyboard cat"}));
    app.use(mongooseAuth.middleware());
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions:true, showStack:true }));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});

require('./routes')(app);

/**-------------- START --------------**/
mongooseAuth.helpExpress(app);
app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
