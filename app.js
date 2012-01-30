

/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = mongoose.SchemaTypes.ObjectId
    , mongooseAuth = require('mongoose-auth')
    , everyauth = require('everyauth')
    , Promise = everyauth.Promise
    , express = require('express')
    , routes = require('./routes');

everyauth.debug = true;

var UserSchema = new Schema({
    name:String,
    lastname:String,
});

UserSchema.plugin(mongooseAuth, {
    everymodule:{
        everyauth:{
            User:function () {
                return User;
            }
        }
    },
    password:{
        loginWith:'email',
        extraParams:{
            name:{
                first:String, 
				last:String
            }
        },
        everyauth:{
            getLoginPath:'/login', 
			postLoginPath:'/login', 
			loginView:'login.jade', 
			getRegisterPath:'/register', 
			postRegisterPath:'/register', 
			registerView:'register.jade', 
			loginSuccessRedirect:'/index', 
			registerSuccessRedirect:'/'
        }
    }
});

mongoose.model('User', UserSchema);

mongoose.connect('mongodb://localhost/snow_reporter')

User = mongoose.model('User');

var app = module.exports = express.createServer();

// Configuration
app.configure(function () {
    app.set('views', __dirname + '/views');
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
mongooseAuth.helpExpress(app);
app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
