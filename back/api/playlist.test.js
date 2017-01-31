var playlist = require("./playlist");

var yt1 = "https://www.youtube.com/watch?v=UwdiUeH1RdA";
var yt2 = "https://youtu.be/EVM0zQ4yQGQ";
var tmc1 = "http://www.tf1.fr/tmc/quotidien-avec-yann-barthes/videos/quotidien-premiere-partie-24-janvier-2017-1.html";

playlist.on("playlist-changed",(playlist) => {
	console.log("Playlist changed")
	console.log(playlist)
})

playlist.on("requesting-error",(error) => {
	console.log("Error")
	console.log(error)
})

playlist.addTrack(yt1)
playlist.addTrack(tmc1)
playlist.addTrack(yt2)