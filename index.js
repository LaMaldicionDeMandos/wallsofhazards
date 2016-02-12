var xnconfig = require('nodejsconfig');
var fs = require('fs');
var data = fs.readFileSync(__dirname+'/config.properties', 'UTF8');
config = xnconfig.parse(process.env.NODE_ENV, data);

console.log('Scope: ' + process.env.NODE_ENV);

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var DB = require('./database');
var dbCred = process.env.MONGOLAB_URI || config.db_connection;
console.log('DB: ' + dbCred);
var db = new DB(dbCred);
var Service = require('./service');
var service = new Service(db);

app.use(bodyParser.json()); // for parsing application/json

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile('index.html');
});

app.post('/', function(req, res) {
  res.sendFile('public/index.html', {root: __dirname });
});

app.post('/newScore', function(req, res) {
	service.newScore(req.body).then(function(isRecord) {
		res.status(200).send(JSON.stringify(isRecord));
	}, function(err) {
		res.sendStatus(400);
	});
});

app.get('/levels/:userId', function(req, res) {
	service.getLevels(req.params.userId).then(
		function(levels) {
			res.status(200).send(JSON.stringify(levels));
		},
		function(err) {
			res.sendStatus(400);
		});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});