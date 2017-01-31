const moment = require("moment");

var monIo = null

function init(io) {
	monIo = io.of("/medias")
	monIo.on("connection", onConnection)
	console.info("Medias socket initialized")
}

function onConnection(socket) {
	console.log("Medias connection with id "+socket.id)
}

exports.init = init
exports.getIo = function(){return monIo;}