var user;
var level = 0;
function sendLevelUp(user, callback) {
	$.ajax({
		type: 'POST',
		data: JSON.stringify(user),
		dataType: 'json',
		contentType: 'application/json',
		url: '/levelUp',
		success: callback
	});		
};

function getLevel(userId, callback) {
	$.ajax({
		url: '/level/' + userId,
		success: callback
	});		
};

