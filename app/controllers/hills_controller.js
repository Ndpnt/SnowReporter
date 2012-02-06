exports.index = function(req, res) {
    Hill.find(function(err, hills) {
		return {hills: hills};
    });
};