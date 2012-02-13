exports.index = function(req, res) {
    Hill.find(function(err, hills) {
  		res.render('hills/index', {hills: hills, user: req.user});
    });
};

exports.show = function(req, res) {
    Hill.findById(req.params.id, function (err, hill) {
        var score = 0;
        var length = 0;
        for(var i = 0; i < hill.comments.length; i += 1) {
          if(!isNaN(parseInt(hill.comments[i].score))) {
            score += parseInt(hill.comments[i].score);
            length += 1; 
          }
        }
        score = score / length;
      res.render('hills/show', {hill: hill, score: score});
    });
};

exports.new = function(req, res) {
	res.render('hills/new', {hill: {}, action: 'create'});
};

exports.edit = function(req, res) {
    Hill.findById(req.params.id, function (err, hill) {
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
    var comment = {
        who     : (req.user ? req.user.first_name + " " + req.user.last_name : 'Anonymous'),
        when    : new Date(),
        content : req.body.comment.content, 
        score   : req.body.comment.score
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