var port = 80;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var rp = require("request-promise");
var path = require('path');
var favicon = require("serve-favicon");



app.use(express.static(__dirname));
app.use(favicon(path.join(__dirname, "/favicon.ico")));


app.get("/busdata.shtml", async function(req, res) {
    var bus_data;
    try {
	bus_data = await rp("http://www.brynmawr.edu/transportation/bico.shtml");
    }
    catch (err) {
	// maybe catch some stuff here?
	throw(err);
    }

    res.send(bus_data);
});



http.listen(port, function(){
    console.log('listening on *:'+port);
});
