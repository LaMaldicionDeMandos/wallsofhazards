function Service() {
	this.users = {};
	this.levelUp = function(userId, level) {
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

module.exports = new Service();