var q = require('q');

var service = function(db) {
	this.db = db;
	var findUserStats = function(userId, exist, notExist) {
		db.UserStats.findOne({userId: userId}).then(
			function(userStats) {
				if (userStats) {
					console.log('Exist user: ' + userId);
					exist(userStats)
				} else {
					console.log('Not Exist user: ' + userId);
					if (notExist) notExist();
				}
		});
	};
	var newUserStats = function(userId, scores) {
		var userStats = new db.UserStats();
		userStats._id = db.ObjectId();
		userStats.userId = userId;
		userStats.scores = scores || [];
		console.log('Saving user: ' + JSON.stringify(userStats));
		userStats.save();
	};
	this.newScore = function(score) {
		var def = q.defer();
		findUserStats(score.userId, 
			function(userStats) { 
				var index = userStats.scores.findIndex(function(item) { return item.level == score.level});
				if (index >= 0 && userStats.scores[index].time <= score.time) {
					def.resolve(false);
				} else {
					def.resolve(true);
					if (index < 0) {
						var newScore = {level: score.level, time: score.time};
						userStats.scores.push(newScore);
					} else {
						userStats.scores[index].time = score.time;
					}
					userStats.save();

				}
			},
			function() {
				console.log('Not Exist user: ' + score.userId + ' So saving new User');
				def.resolve(true);
				newUserStats(score.userId, [{level: score.level, time: score.time}]);
			});
		return def.promise;
	};
	this.getLevels = function(userId) {
		var def = q.defer();
		findUserStats(userId, 
			function(userStats) { def.resolve(userStats.scores);}, 
			function() {
				def.resolve([]);
				newUserStats(userId);
			});
		return def.promise;
	};
};

module.exports = service;