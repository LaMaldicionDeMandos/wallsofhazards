function givemeUserName(object, callback) {
	SendMessage(object, callback, user.first_name);
}

function givemeUserId(object, callback) {
	SendMessage(object, callback, user.id);
}

function levelUp(object, callback, userId, level) {
	sendPost('/levelUp', {userId: userId, level: level}, function(data) { alert('Level up con parametros');});
	//SendMessage(object, callback, level);
}