const express = require("express");
const app = express();
const http = require("http").Server(app)
const io = require("socket.io")(http)

const monitorIo = require("./back/monitorIo")
const mediasIo = require("./back/mediasIo")

app.use("/dist",express.static(__dirname+"/dist"))
app.use("/front",express.static(__dirname+"/front"))

app.get("/", (req,res) => {
	res.redirect('/medias');
})

app.get("/medias", (req,res) => {
	res.sendFile(__dirname+"/views/medias.html")
})

app.get("/monitor", (req,res) => {
	res.sendFile(__dirname+"/views/monitor.html")
})

app.get("/ping", (req,res) => {
	res.sendFile(__dirname+"/views/ping.html")
})

mediasIo.init(io);
monitorIo.init(io);

http.listen(8080, () => {
	console.info("Server started on *:8080")
});