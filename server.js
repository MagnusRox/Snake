var express = require("express");
var app = express();
var path = require("path");
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    //__dirname : It will resolve to your project folder.
});
app.get('/snakey.js', function (req, res) {
    res.sendFile(path.join(__dirname + '/snakey.js'));
});
app.get('/style.css', function (req, res) {
    res.sendFile(path.join(__dirname + '/style.css'));
});
app.get('/food.png', function (req, res) {
    res.sendFile(path.join(__dirname + '/food.png'));
});
app.get('/ground.png', function (req, res) {
    res.sendFile(path.join(__dirname + '/ground.png'));
});
app.listen(3000);
console.log("Server running at Port 3000");

