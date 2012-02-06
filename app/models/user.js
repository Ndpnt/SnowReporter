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
            getLoginPath:'/users/login', 
			postLoginPath:'/login', 
			loginView:'users/login.haml', 
			getRegisterPath:'/users/register', 
			postRegisterPath:'/register', 
			registerView:'users/register.haml', 
			loginSuccessRedirect:'/', 
			registerSuccessRedirect:'/'
        }
    }
});

mongoose.model('User', UserSchema);