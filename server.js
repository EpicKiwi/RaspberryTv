const express = require("express");
const app = express();
const http = require("http").Server(app)
const io = require("socket.io")(http)

const monitorIo = require("./back/monitorIo")

app.use("/dist",express.static(__dirname+"/dist"))

app.get("/monitor", (req,res) => {
	res.sendFile(__dirname+"/views/monitor.html")
})

app.get("/ping", (req,res) => {
	res.sendFile(__dirname+"/views/ping.html")
})

monitorIo.init(io);

http.listen(8080, () => {
	console.info("Server started on *:8080")
});