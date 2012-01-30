mongoose.model('User', {
    properties: ['user', 'pass', 'widgets' ],
    indexes: [ { 'user' : 1 } , { unique : true }  ],
});

mongoose.model('Widget', {
    properties: ['id', 'html', 'title' ],
    indexes: [ { 'id' : 1 } , { unique : true }  ],
});

var User = exports.User  = db.model('User');
var Widget = exports.Widget = db.model('Widget');