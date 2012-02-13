var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	mongooseAuth = require('mongoose-auth');

var UserSchema = new Schema();

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
          first_name: String, 
          last_name :  String,
          skimaster : Boolean
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