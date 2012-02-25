var mongoose 	 = require('mongoose')
    Schema 		 = mongoose.Schema,
require('../app/models/user');
mongoose.connect('mongodb://localhost/snow_reporter');
User = mongoose.model('User');



require('../app/models/hill');
Hill = mongoose.model('Hill');
User.collection.remove();
console.log('User collection cleared');

Hill.collection.remove();
console.log('Hill collection cleared');
var isola = new Hill({
    name               : "Isola 2000",
    snow_top           : 100,
    snow_bottom        : 35,
    updated_at         : new Date(),
    green_runs 		     : 5,
    green_runs_open    : 3,
    blue_runs 		     : 6,
    blue_runs_open     : 6,
    red_runs 		       : 10,
    red_runs_open      : 9,
    black_runs 		     : 2,
    black_runs_open    : 2,
});
isola.save();
console.log('Isola created');
var auron = new Hill({
    name               : "Auron",
    snow_top           : 90,
    snow_bottom        : 45,
    updated_at         : new Date(),
    green_runs 		     : 2,
    green_runs_open    : 2,
    blue_runs 		     : 4,
    blue_runs_open     : 3,
    red_runs 		       : 13,
    red_runs_open      : 12,
    black_runs 		     : 2,
    black_runs_open    : 1,
});
auron.save();
console.log('Auron created');
mongoose.connection.close();
console.log('Connection closed');