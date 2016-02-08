var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile('index.html');
});

app.post('/', function(req, res) {
  res.sendFile('public/index.html', {root: __dirname });
});

app.post('/levelUp', function(req, res) {
	console.log('Send Ajax pass level');
	res.send(200);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});