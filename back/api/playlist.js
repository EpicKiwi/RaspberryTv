var ytdl = require('youtube-dl')
var request = require('request')
var EventEmitter = require('events')

var providers = [
	{reg:/.*youtube\.com.*/,name:"youtube"},
	{reg:/.*youtu\.be.*/,name:"youtube"},
	{reg:/.*soundcloud\.com.*/,name:"soundcloud"}
]

var tracks = [];
var pendingTracks = [];

function Track(url){
	this.baseurl = url
	this.infosRequested = false;
	this.formatId = null
	this.url = null
	this.title = null
	this.provider = null;

	for(var i = 0; i < providers.length; i++){
		if(this.baseurl.match(providers[i].reg)){
			this.provider = providers[i].name;
			break;
		}
	}
	if(!this.provider){
		this.provider = "other"
	}

	this.requestInfos = function(callback) {
		ytdl.exec(this.baseurl,["-F"],{},(err,output) => {
			if(err){
				callback(err)
				return;
			}
			this.formatId = output[output.length-1].replace(/([^ ]+) +.*/,"$1")
			ytdl.exec(this.baseurl,["-gef",this.formatId],{},(err,output) => {
				if(err){
					callback(err)
					return;
				}
				this.title = output[0]
				this.url = output[1]
				this.infosRequested = true
				if(callback)
					callback(undefined,this);
			})
		})
	}
}

function addTrack(url){
	var thistrack = new Track(url);
	pendingTracks.push(thistrack)
	thistrack.requestInfos((err,track) => {
		if(err){
			err.track = thistrack
			module.exports.emit("requesting-error",err)
			console.error(err)
			var index = pendingTracks.indexOf(thistrack)
			if(index != -1)
				pendingTracks.splice(index,1)
			return;
		}
		var index = pendingTracks.indexOf(thistrack)
		if(index != -1)
			pendingTracks.splice(index,1)
		tracks.push(thistrack)
		module.exports.emit("playlist-changed",tracks)
		module.exports.emit("added-track",thistrack)
	})
}

class PlaylistEmitter extends EventEmitter {
	getTracks(){
		return tracks
	}
	getPendingTracks(){
		return pendingTracks
	}
}

var pe = new PlaylistEmitter()
pe.Track = Track
pe.addTrack = addTrack

module.exports = pe
