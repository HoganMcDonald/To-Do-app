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
var config = {
  database: 'omega',
  host: 'localhost',
  port: 5432,
  max: 20
};
var pool = new pg.Pool(config);

//listen
app.listen(port, function() {
  console.log('server up on', port);
});

//base url
app.get('/', function(req, res) {
  res.sendFile(path.resolve('views/index.html'));
});

//get list
app.get('/getList', function(req, res) {
  pool.connect(function(err, connection, done) {
    if (err) {
      console.log('error');
      done();
      res.sendStatus(400);
    } else {
      var tasks = [];
      var results = connection.query('SELECT * FROM todo');
      results.on('row', function(row) {
        tasks.push(row);
      });
      results.on('end', function() {
        done();
        res.send(tasks);
      });
    }
  }); //end pool.connect
}); //end get list

//post to list
app.post('/addList', function(req, res) {
  pool.connect(function(err, connection, done) {
    if (err) {
      console.log('error');
      done();
      res.sendStatus(400);
    } else {
      connection.query('INSERT INTO todo (task, notes) VALUES ($1, $2)', [req.body.task, req.body.notes]);
      done();
      res.sendStatus(201);
    }
  }); //end pool.connect
}); //end post to list

//delete from list
app.delete('/removeList', function(req, res) {
  pool.connect(function(err, connection, done) {
    if (err) {
      console.log('error');
      done();
      res.sendStatus(400);
    } else {
      connection.query("DELETE FROM todo WHERE id = " + Number(req.body.id));
      done();
      res.sendStatus(201);
    }
  });
});
