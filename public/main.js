var user;
var level = 0;
function sendScore(user) {
	$.ajax({
		type: 'POST',
		data: JSON.stringify(user),
		dataType: 'json',
		contentType: 'application/json',
		url: '/newScore',
		success: callback
	});		
};

function getLevels(userId, callback) {
	$.ajax({
		url: '/levels/' + userId,
		success: callback
	});		
};

