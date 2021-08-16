var express = require('express');
var app = express();

// Print to the console information about each request made
app.use((req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});

// Send the index.html file to the root path 
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
});

// Serve an object as a response to the GET requests to the json route
app.get("/json", (req, res) => {
    if (process.env.MESSAGE_STYLE == "uppercase") {
        res.json({"message":"HELLO JSON"})
    } else {
        res.json({"message":"Hello json"})
    }
});

// Serve an object with the current time as a response to the GET requests to the json route
// Chain a middleware function and the final handler
app.get("/now", (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.send({"time":req.time});
});

// Mount the middleware to serve the styles sheet in the public folder
app.use("/public", express.static(__dirname + "/public"));

console.log("Hello World");


































 module.exports = app;
