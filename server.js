const express = require("express");
const app = express();

app.use("/dist",express.static(__dirname+"/dist"))

app.get("/monitor", (req,res) => {
	res.sendFile(__dirname+"/views/monitor.html")
})

app.listen(80);