require('./user');

var mongoose = require('mongoose'),
	Schema   = mongoose.Schema;

User = mongoose.model('User'); 

ScoreSchema = new Schema({
	who  : String,
    when : Date,
    score: {type: Number, min: 0, max : 4}
});

CommentSchema = new Schema({
	who  : String,
    when : Date,
    score: {type: Number, min: 0, max : 4}
});

var HillSchema = new Schema({
    _id                : Schema.ObjectId,
    name               : String,
    snow_top           : {type: Number, min: 0},
    snow_bottom        : {type: Number, min: 0},
	updated_at         : Date,
	green_runs 		   : {type: Number, min: 0},
	green_runs_open    : {type: Number, min: 0},
	blue_runs 		   : {type: Number, min: 0},
	blue_runs_open     : {type: Number, min: 0},
	red_runs 		   : {type: Number, min: 0},
	red_runs_open      : {type: Number, min: 0},
	black_runs 		   : {type: Number, min: 0},
	black_runs_open    : {type: Number, min: 0},
    keyword_evaluation : [String],
    qualified_users    : [User],
    score_evaluations  : [ScoreSchema],
    comments		   : [CommentSchema]
});


mongoose.model('Hill', HillSchema);