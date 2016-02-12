function givemeUserName(object, callback) {
	SendMessage(object, callback, user.first_name);
}

function givemeLevels(object, callback) {
	getLevels(user.id, function(levels) {
		console.log('givemeLevels: ' + levels);
		SendMessage(object, callback, levels);
	});
}

function newScore(object, callback, level, time) {
	sendScore({userId: user.id, level: level, time: time}, function(isRecord) {
		if (isRecord) {
			console.log('New Record!!');
		}
		SendMessage(object, callback, level, time, isRecord);
	});
}