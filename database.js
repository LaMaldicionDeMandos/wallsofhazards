var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var UserStatsSchema = new Schema({_id: ObjectId, userId: String, scores:[{level: Number, time: Number}]});

var UserStats = mongoose.model('UserStats', UserStatsSchema);

var db = function(credentials) {
	mongoose.connect(credentials);
	var Schema = mongoose.Schema;
	var ObjectId = Schema.ObjectId;
	console.log('Connecting to mongodb');
	this.mongoose = mongoose;
	this.Schema = Schema;
	this.ObjectId = mongoose.Types.ObjectId;
	this.UserStats = UserStats;
};

process.on('exit', function() {
	console.log('Desconnecting db');
	mongoose.disconnect();
});

module.exports = db;