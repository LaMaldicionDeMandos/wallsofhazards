var express = require('express');
var passport = require('passport');
var path = require('path');
var FacebookStrategy = require('passport-facebook').Strategy;
var app = express();
var port = process.env.PORT || 5000;
app.set('port', port);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));

passport.use(new FacebookStrategy({
    clientID: '1671252833107790',
    clientSecret: '52e12dd38b0ceca835988927268e7e4b',
    callbackURL: "/auth/facebook/callback",
    enableProof: false
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('Token: ' + accessToken);
    console.log('should refreshToken: ' + refreshToken);
    console.log('profile: ' + JSON.stringify(profile));
  }
));

app.use(passport.initialize());

app.get('/auth/facebook',
  passport.authenticate('facebook'),
  function(req, res){
    // The request will be redirected to Facebook for authentication, so this
    // function will not be called.
  });

app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', {}),
  function(req, res) {
    console.log('Redirecting from facebook');
    res.redirect('/');
  });

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/login', function(req, res) {
  console.log('login');
  res.sendFile('public/login.html', {root: __dirname });
});

app.get('/', function(req, res) {
  	res.sendFile('index.html', {root: __dirname });
});

app.post('/', ensureAuthenticated, function(req, res) {
	console.log('post from facbook: ' + JSON.stringify(req.body));
	console.log('post from facbook: ' + JSON.stringify(req.path));
	console.log('post from facbook: ' + JSON.stringify(req.params));
	console.log('post from facbook: ' + JSON.stringify(req.query));
	res.sendFile('public/index.html', {root: __dirname });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}