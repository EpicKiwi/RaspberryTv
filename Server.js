const express = require("express")
const app = express()
const http = require("http").Server(app)
const io = require("socket.io")(http)

app.use("/static", express.static(__dirname+"/static"))

app.get("/monitor", (req,res) => {
	res.sendFile(__dirname+"/views/monitor.html");
});

io.on("connection", (socket) => {
	console.info("Incroyable ! une connexion !")
})

http.listen(80, () => {
	console.info("Listening on *:80")
})