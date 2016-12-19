const moment = require("moment");

const backgroundApi = require("./api/background")
var monIo = null

function init(io) {
	monIo = io.of("/monitor")
	monIo.on("connection", onConnection)
	console.info("Monitor socket initialized")
}

function onConnection(socket) {
	console.log("Monitor connection with id "+socket.id)
	sendNewBackground(socket);
}

function sendNewBackground(socket){
	backgroundApi.getCurrentImage((error,background) => {
		if(error){
			console.error("Error while loading background informations. Retrying in 1m...");
			console.error(error);
			setTimeout(()=>{sendNewBackground(socket);},60000)
		} else {
			socket.emit("newBackground",background)
			console.info("New background sended to "+socket.id)
			setTimeout(()=>{
				sendNewBackground(socket)
			},(background.expires.unix()-moment().unix())*1000)
		}
	})
}

exports.init = init
exports.getIo = function(){return monIo;}