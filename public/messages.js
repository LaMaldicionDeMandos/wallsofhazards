function givemeUserName(object, callback) {
	SendMessage(object, callback, user.first_name);
}

function givemeLevel(object, callback) {
	getLevel(user.id, function(data) {
		console.log('givemeLevel: ' + data);
		SendMessage(object, callback, data);
	});
}

function levelUp(object, callback, level) {
	sendLevelUp({userId: user.id, level: level});
}