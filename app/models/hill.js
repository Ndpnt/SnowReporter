require('./user');
var mongoose = require('mongoose'),
	Schema   = mongoose.Schema;

User = mongoose.model('User');

var HillSchema = new Schema({
    _id             : Schema.ObjectId,
    name            : String,
    snow_top        : {type: Number, min: 0},
    snow_bottom     : {type: Number, min: 0},
    total_nb_lifts  : {type: Number, min: 0},
    lifts           : [{
        type: String,
        open: Boolean
    }],
    qualified_users : [User],
    score_evaluations: [{
       who  : String,
       when : Date,
       score: {type: Number, min: 0, max : 4}
    }],
    keyword_evaluation: [String],
    comments: [{
        who     : String,
        comment : String
    }]
});


mongoose.model('Hill', HillSchema);