var sockets = [];

exports.setup = function socketSetup(app) {
	var socketio = require('socket.io').listen(app);

	socketio.sockets.on('connection', function(socket) {
		sockets.push(socket);

		socket.on('disconnect', function() {
			sockets.slice(sockets.indexOf(socket), socket);
		});
	});
}

exports.pushComment = function pushUpdate(comment) {
  for (var i = 0; i < sockets.length; i += 1) {
		sockets[i].emit('comment', comment);
  }
}

exports.pushHillScore = function pushUpdate(hill, score) {
  for (var i = 0; i < sockets.length; i += 1) {
		sockets[i].emit('hill_score', hill, score);
  }
}