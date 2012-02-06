exports.index = function(req, res) {
    Hill.find(function(err, hills) {
		res.render('hills/index', {hills: hills});
    });
};

exports.show = function(req, res) {
    Hill.find({name: req.params.name},function(err, hill) {
		res.render('hills/index', {hills: hill});
    });
};