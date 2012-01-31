var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var HillSchema = new Schema({
    name            : ObjectId,
    snow_top        : {type: Number, min: 0},
    snow_bottom     : {type: Number, min: 0},
    total_nb_lifts  : {type: Number, min: 0},
    lifts           : [{
        type: String,
        open: Boolean
    }],
    qualified_users : [Users],
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