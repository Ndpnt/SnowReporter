exports.index = function(req, res) {
    Hill.find(function(err, hills) {
		if(req.user) {
			console.log(req.user);
		}
		res.render('hills/index', {hills: hills, user: req.user});
    });
};

exports.show = function(req, res) {
    Hill.findById(req.params.id, function (err, hill) {
		res.render('hills/show', {hill: hill});
    });
};

exports.new = function(req, res) {
	res.render('hills/new', {hill: {}, action: 'create'});
};

exports.edit = function(req, res) {
    Hill.findById(req.params.id, function (err, hill) {
        res.render('hills/edit', {hill: hill, action: 'edit'});
    });	
};

exports.create = function(req, res) {
	var new_hill = new Hill(req.body.hill);
	new_hill.updated_at = new Date();
    new_hill.save();
    res.redirect('/hills');
};

exports.update = function(req, res) {
	req.body.hill.updated_at = new Date();
	Hill.update({_id: req.body.hill_id}, req.body.hill, {}, function(err, hill) {
		res.redirect('/hills');
	});
};

exports.destroy = function(req, res) {
    Hill.findById(req.body.hill_id, function (err, hill) {
        hill.remove();
    	res.redirect('/hills');
    });
};