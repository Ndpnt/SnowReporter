exports.index = function(req, res) {
    Hill.find(function(err, hills) {
  		res.render('hills/index', {hills: hills, user: req.user});
    });
};

exports.show = function(req, res) {
    Hill.findById(req.params.id, function (err, hill) {
        var score = 0;
        var length = 0;
        var dateToCompareWith = new Date();
        var newDate = dateToCompareWith.getTime();
        newDate = newDate - (3600 * 1000 * 24 * 7);
        dateToCompareWith.setTime(newDate);
        var comments = [];
        for(var i = 0; i < hill.comments.length; i += 1) {
          if (hill.comments[i].when > dateToCompareWith) {
            comments.push(hill.comments[i]);
            if(!isNaN(parseInt(hill.comments[i].score))) {
              score += parseInt(hill.comments[i].score);
              length += 1; 
            }
          }  
        }
        score = score / length;
      res.render('hills/show', {hill: hill, score: score, comments: comments});
    });
};

exports.new = function(req, res) {
	res.render('hills/new', {hill: {}, action: 'create'});
};

exports.edit = function(req, res) {
    Hill.findById(req.params.id, function (err, hill) {
        console.log(hill);
        res.render('hills/edit', {hill: hill, action: 'update'});
    });	
};

exports.create = function(req, res) {
    var new_hill = new Hill(req.body.hill);
    new_hill.updated_at = new Date();
    new_hill.qualified_users.push(req.user.email);
    new_hill.save(function (err) {
      if (!err) {
        req.flash('info', 'Hill correctly saved');
        res.redirect('/hills');
      } else {
        req.flash('error', 'Hill not saved due to errors');
        res.redirect('/hills');
      }
    });
};

exports.update = function(req, res) {
	req.body.hill.updated_at = new Date();
	Hill.update({_id: req.body.hill_id}, req.body.hill, {}, function(err, hill) {
      if (!err) {
        req.flash('info', 'Hill correctly updated');
        res.redirect('/hills');
      } else {
        req.flash('error', 'Hill not updated due to errors');
        res.redirect('/hills');
      }
	});
};

exports.comment = function(req, res) {
    req.body.hill.updated_at = new Date();
    
    var snow_quality = '';
    if (typeof req.body.comment.snow_description !== 'undefined') {
      for (var i = 0; i < req.body.comment.snow_description.length; i += 1) {
        snow_quality += req.body.comment.snow_description[i];
        snow_quality += (i === req.body.comment.snow_description.length - 1 ? '' : ', ');
      };
    }
    var comment = {
        who             : (req.user ? req.user.first_name + " " + req.user.last_name : 'Anonymous'),
        when            : new Date(),
        content         : req.body.comment.content, 
        snow_description: snow_quality,
        score           : req.body.comment.score
    };
    var hill_id = req.body.hill.id
    Hill.findById(hill_id, function (err, hill) {
        hill.comments.push(comment);
        hill.save(function (err) {
          if (!err) {
            req.flash('info', 'Comment correctly saved');
            res.redirect('/hills/' + hill.id);
          } else {
            req.flash('error', 'Comment not saved due to errors');
            res.redirect('/hills');
          }
        });
    });	
};

exports.destroy = function(req, res) {
    Hill.findById(req.body.hill_id, function (err, hill) {
      hill.remove();
      req.flash('info', 'Hill correctly removed');
    	res.redirect('/hills');
    });
};