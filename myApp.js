var express = require('express');
var app = express();

// Send the index.html file to the root path 
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
});

// Mount the middleware to serve the styles sheet in the public folder
app.use("/public", express.static(__dirname + "/public"));

console.log("Hello World");


































 module.exports = app;
