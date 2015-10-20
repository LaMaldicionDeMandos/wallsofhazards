var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  	res.sendFile('index.html');
});

app.post('/', function(req, res) {
	console.log('post from facbook: ' + JSON.stringify(req.body));
	console.log('post from facbook: ' + JSON.stringify(req.path));
	console.log('post from facbook: ' + JSON.stringify(req.params));
	console.log('post from facbook: ' + JSON.stringify(req.query));
	res.sendFile('public/index.html', {root: __dirname });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});