var socket = io("/medias");

socket.on("playlist-changed",function(playlist){
	console.log("playlist-changed",playlist);
	$("#playlist").html("");
	for(var i = 0; i<playlist.length; i++){
		$("#playlist").append("<li><strong>"+playlist[i].title+"</strong> : "+playlist[i].provider+"</li>")
	}
	if(playlist.length > 0)
		$(".nothing.playlist").hide()
	else
		$(".nothing.playlist").show()
});

socket.on("pending-playlist-changed",function(playlist){
	console.log("pending-playlist-changed",playlist);
	$("#pending").html("");
	for(var i = 0; i<playlist.length; i++){
		$("#pending").append("<li>"+playlist[i].baseurl+"</li>")
	}
	if(playlist.length > 0)
		$(".nothing.pending").hide()
	else
		$(".nothing.pending").show()
});

socket.on("requesting-error",function(error){
	console.log("requesting-error",error);
	$("#adderr").html("Erreur d'ajout de "+error.track.baseurl+"; vérifiez l'url")
});

$("#addtrc").submit(function(e){
	e.preventDefault();
	var url = $("#url").val();
	if(!url) return;
	$("#adderr").html("");
	$("#url").val("");
	socket.emit("add-track",url);
	console.log("Requesting for "+url+" addition");
})

$("#play").click(function(e){
	e.preventDefault();
	socket.emit("play");
})

$("#pause").click(function(e){
	e.preventDefault();
	socket.emit("pause");
})

$("#stop").click(function(e){
	e.preventDefault();
	socket.emit("stop");
})

$("#skip").click(function(e){
	e.preventDefault();
	socket.emit("skip");
})