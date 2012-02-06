exports.index = function(req, res) {
    Hill.find(function(err, hills) {
		res.render('hills/index', {hills: hills});
    });
};