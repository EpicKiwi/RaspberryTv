const moment = require("moment")
const playlist = require("./api/playlist")
const player = require("./api/player")

var monIo = null

function init(io) {
	monIo = io.of("/medias")
	monIo.on("connection", onConnection)
	player.init();
	console.info("Medias socket initialized")
}

function onConnection(socket) {
	playlist.events.on("added-track", function(track){socket.emit("added-track", track);})
	playlist.events.on("playlist-changed", function(playlist){socket.emit("playlist-changed", playlist);})
	playlist.events.on("requesting-error", function(error){socket.emit("requesting-error", error);})
	playlist.events.on("added-pending-track", function(track){socket.emit("added-pending-track", track);})
	playlist.events.on("removed-pending-track", function(track){socket.emit("removed-pending-track", track);})
	playlist.events.on("pending-playlist-changed", function(playlist){socket.emit("pending-playlist-changed", playlist);})
	socket.on("add-track",function(url){
		console.log(socket.id+" requesting to add "+url);
		playlist.addTrack(url)
	})
	socket.on("play",function(){
		player.play()
	})
	socket.on("pause",function(){
		player.pause()
	})
	socket.on("stop",function(){
		player.stop()
	})
	socket.on("skip",function(){
		player.skip()
	})
	socket.emit("playlist-changed", playlist.getTracks())
	socket.emit("pending-playlist-changed", playlist.getPendingTracks())
	console.log("Medias connection with id "+socket.id)
}

exports.init = init
exports.getIo = function(){return monIo;}