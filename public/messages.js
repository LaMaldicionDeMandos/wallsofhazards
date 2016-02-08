function givemeUserName(object, callback) {
	SendMessage(object, callback, user.first_name);
}

function givemeUserId(object, callback) {
	SendMessage(object, callback, user.id);
}

function passLevel(object, callback, userId, level) {
	SendMessage(object, callback, level);
}