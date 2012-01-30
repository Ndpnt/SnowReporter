var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	mongooseAuth = require('mongoose-auth');

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