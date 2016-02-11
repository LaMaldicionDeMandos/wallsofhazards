var service = function(db) {
	this.db = db;
	this.users = {};
	this.levelUp = function(userId, level, time) {
		// Esto lo tengo que cambiar
		if(this.db) {
			var userStats = new db.UserStats();
			userStats._id = db.ObjectId();
			userStats.userId = userId;
			userStats.scores = [{level: level, time: time}];
			userStats.save(function(err) {
				if (err) {
					console.log(err);
					callback('Error: ' + userStats.userId + ' --> ' + err);
				} else {
					console.log('Save Success:' + userStats.userId);
				}
			});
		}
		console.log('Level up userId: ' + userId + ' level: ' + level);
		this.users[userId] = level;
	};
	this.lastLevel = function(userId) {
		var level = this.users[userId];
		if (!level) level = 0;
		console.log('Last level for userId: ' + userId + ' level: ' + level);
		return level
	};
};

module.exports = service;