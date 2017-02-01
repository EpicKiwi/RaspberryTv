const playlist = require("./playlist")
const omxp = require("omxplayer-controll")
var EventEmitter = require('events')

var currentPlaying = null;
var currentPlayingIndex = -1;
var emitter = new EventEmitter();

function init(){
	console.log("Player initialization")
	playlist.events.on("playlist-changed",onPlaylistChange)
}

function play(){
	if(!currentPlaying) return
	console.log("playing "+currentPlaying.title)
}

function pause(){
	if(!currentPlaying) return
	console.log("paused "+currentPlaying.title)
}

function stop(){
	if(!currentPlaying) return
	console.log("stopping "+currentPlaying.title)
}

function skip(){
	if(!currentPlaying){
		if(playlist.length > 0){
			currentPlaying = playlist[0]
			currentPlayingIndex = 0;
			play()
		}
	} else {
		stop()
		if(currentPlayingIndex+1 >= playlist.getTracks().length){
			currentPlayingIndex++
			currentPlaying = playlist[currentPlayingIndex]
			play()
		}
	}
}

function onPlaylistChange(playlist){
	if(!currentPlaying){
		if(playlist.length > 0){
			currentPlaying = playlist[0]
			currentPlayingIndex = 0
			play()
		}
	} else {
		var newindex = playlist.indexOf(currentPlaying)
		if(newindex == -1){
			if(playlist.length >= currentPlayingIndex){
				currentPlaying = playlist[currentPlaying]
				play()
			} else if(playlist.length > 0) {
				currentPlaying = null
				onPlaylistChange(playlist)
			} else {
				currentPlaying = null
				stop()
			}
		} else {
			currentPlayingIndex = newindex
		}
	}
}

exports.getCurrentPlayingTrack = function() {
	return currentPlaying
}
exports.play = play
exports.pause = pause
exports.stop = stop
exports.skip = skip
exports.events = emitter
exports.init = init