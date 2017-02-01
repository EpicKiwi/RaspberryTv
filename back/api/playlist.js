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
var emitter = new EventEmitter();

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
		ytdl.exec(this.baseurl,["--no-check-certificate","-F"],{},(err,output) => {
			if(err){
				callback(err)
				return;
			}
			this.formatId = output[output.length-1].replace(/([^ ]+) +.*/,"$1")
			ytdl.exec(this.baseurl,["--no-check-certificate","-gef",this.formatId],{},(err,output) => {
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
	emitter.emit("pending-playlist-changed",pendingTracks)
	emitter.emit("added-pending-track",thistrack)
	thistrack.requestInfos((err,track) => {
		if(err){
			err.track = thistrack
			emitter.emit("requesting-error",err)
			console.error(err)
			var index = pendingTracks.indexOf(thistrack)
			if(index != -1){
				pendingTracks.splice(index,1)
				emitter.emit("pending-playlist-changed",pendingTracks)
				emitter.emit("removed-pending-track",thistrack)
			}
			return;
		}
		var index = pendingTracks.indexOf(thistrack)
		if(index != -1){
			pendingTracks.splice(index,1)
			emitter.emit("pending-playlist-changed",pendingTracks)
			emitter.emit("removed-pending-track",thistrack)
		}
		tracks.push(thistrack)
		emitter.emit("playlist-changed",tracks)
		emitter.emit("added-track",thistrack)
	})
}

exports.Track = Track
exports.events = emitter
exports.addTrack = addTrack
exports.getTracks = function(){return tracks;}
exports.getPendingTracks = function(){return pendingTracks;}
