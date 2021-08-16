var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Mount the middleware body-parser to handle encoded data
app.use(bodyParser.urlencoded({extended: false}));

// Parse the json data sent in the POST request
app.use(bodyParser.json());

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

// Serve an object with the current time as a response to the GET requests to the now route
// Chain a middleware function and the final handler
app.get("/now", (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.send({"time":req.time});
});

// Serve an object with an echo of a word in the path before "/echo"
app.get("/:word/echo", (req, res) => {
    res.json({"echo": req.params.word});
});

// Serve an object with the values of keys "first" and "last" of a query parameter input
app.get("/name", (req, res) => {
    res.json({"name": `${req.query.first} ${req.query.last}`});
});

// Serve an object as a response to the POST requests to the name route
// The object should extract the "first" and "last" input values on the form of the index page
app.post("/name", (req,res) => {
    res.json({"name": `${req.body.first} ${req.body.last}`});
});

// Mount the middleware to serve the styles sheet in the public folder
app.use("/public", express.static(__dirname + "/public"));

console.log("Hello World");


































 module.exports = app;
