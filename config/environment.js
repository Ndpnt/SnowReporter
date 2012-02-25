module.exports = function(app, express){
	// Configuration
	app.configure(function () {
	    app.set('views', __dirname + '/../app/views');
	    app.set('view engine', 'haml');
		  app.register('.haml', require('hamljs'));
	    app.use(express.bodyParser());
	    app.use(express.methodOverride());
	    app.use(express.cookieParser());
	    app.use(express.logger());
	    app.use(express.session({ secret:"keyboard cat"}));
	    app.use(mongooseAuth.middleware());
	    app.use(express.static(__dirname + '/../public'));
	});

	app.configure('development', function () {
	    app.use(express.errorHandler({ dumpExceptions:true, showStack:true }));
	});

	app.configure('production', function () {
	    app.use(express.errorHandler());
	});    
};