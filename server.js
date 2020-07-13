//var http = require('http');
//var fs = require('fs');
//var port = process.env.PORT || 3338;

//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type':'text/html' });
//    fs.readFile('./index.html', null,function(error,data) {
//        if (error) {
//            res.writeHead(404);
//            res.write('html file not found');
//        } else {
//            res.write(data);
//        }+
//        res.end();
//    });
//}).listen(port);
var express = require("express");
var app = express();
var path = require("path");
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    //__dirname : It will resolve to your project folder.
});
app.listen(3000);
console.log("Server running at Port 3000");