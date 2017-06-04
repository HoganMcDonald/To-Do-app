//requires
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');

//uses
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

//globals
var port = 7575;

//listen
app.listen(port, function() {
  console.log('server up on', port);
});

//base url
app.get('/', function(req, res) {
  res.sendFile(path.resolve('views/index.html'));
});
