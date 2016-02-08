var user;

function sendPost(path, data, callback) {
	$.ajax({
		type: 'POST',
		data: data,
		url: path,
		success: callback
	});		
}