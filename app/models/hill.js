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
	  who             : String,
    when            : Date,
    content         : String,
    score           : {type: Number, min: 0, max : 4},
    snow_description: String
});

var HillSchema = new Schema({
    _id                : Schema.ObjectId,
    name               : String,
    snow_top           : {type: Number, min: 0},
    snow_bottom        : {type: Number, min: 0},
    updated_at         : Date,
    green_runs 		     : {type: Number, min: 0},
    green_runs_open    : {type: Number, min: 0},
    blue_runs 		     : {type: Number, min: 0},
    blue_runs_open     : {type: Number, min: 0},
    red_runs 		       : {type: Number, min: 0},
    red_runs_open      : {type: Number, min: 0},
    black_runs 		     : {type: Number, min: 0},
    black_runs_open    : {type: Number, min: 0},
    keyword_evaluation : [String],
    qualified_users    : [String],
    score_evaluations  : [ScoreSchema],
    comments		       : [CommentSchema]
});


/**
 * Return all comments that are maximum 1 week old
 */
HillSchema.methods.getComments = function() {
    var comments = [];
    var dateToCompareWith = new Date();
    var newDate = dateToCompareWith.getTime();
    newDate = newDate - (3600 * 1000 * 24 * 7);
    dateToCompareWith.setTime(newDate);
    for(var i = 0; i < this.comments.length; i += 1) {
      if (this.comments[i].when > dateToCompareWith) {
        comments.push(this.comments[i]);
      }  
    }
    return comments;
}

/**
 * Return the score of the hills relatives to comments
 */
HillSchema.methods.computeScore = function() {
    var comments = this.getComments();
    var length = 0, score = 0;
    for(var i = 0; i < comments.length; i += 1) {
      if(!isNaN(parseInt(comments[i].score))) {
        score += parseInt(comments[i].score);
        length += 1; 
      }
    }
    score = score / length;
    
    return (isNaN(score) ? '-' : score.toPrecision(2));
};

mongoose.model('Hill', HillSchema);
