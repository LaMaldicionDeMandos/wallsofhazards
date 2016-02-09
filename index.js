var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var service = require('./service');

app.use(bodyParser.json()); // for parsing application/json

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile('index.html');
});

app.post('/', function(req, res) {
  res.sendFile('public/index.html', {root: __dirname });
});

app.post('/levelUp', function(req, res) {
	service.levelUp(req.body.userId, req.body.level);
	res.sendStatus(200);
});

app.get('/level/:userId', function(req, res) {
	var level = service.lastLevel(req.params.userId);
	res.status(200).send(JSON.stringify(level));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});