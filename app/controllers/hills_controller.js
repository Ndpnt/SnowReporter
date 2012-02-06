exports.index = function(req, res) {
    // var hill = new Hill({name: "Auron"});
    // hill.save();
    Hill.find(function(err, hills) {
        res.render('hills/index', {hills: hills})
    });
};