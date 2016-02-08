var user;

function sendPost() {
	$.ajax({
		type: 'POST',
		data: 'ping',
		url: '/passLevel',
		success: function( data ) {
			alert('Send POST OK');
		},
	});		
}