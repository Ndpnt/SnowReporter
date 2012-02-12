exports.index = function(req, res) {
    Hill.find(function(err, hills) {
		res.render('hills/index', {hills: hills});
    });
};

exports.show = function(req, res) {
    Hill.findById(req.params.id, function (err, hill) {
		res.render('hills/show', {hill: hill});
    });
};

exports.new = function(req, res) {
	res.render('hills/new', {hill: {}});
};

exports.edit = function(req, res) {
    Hill.findById(req.params.id, function (err, hill) {
		console.log(hill);
		hill.save(req.body.hill);
		console.log(hill);
        res.render('hills/edit', {hill: hill});
    });	
};

exports.create = function(req, res) {
    var new_hill = new Hill(req.body.hill);
    new_hill.save()
    res.redirect('/hills');
};

exports.destroy = function(req, res) {
    Hill.findById(req.body.hill_id, function (err, hill) {
        hill.remove();
    });
    res.redirect('/hills');
};