var username;
function login() {
	$.ajax({
	  url: "/auth/facebook",
	  method: 'GET'
	}).done(function() {
	  console.log('Logged in');
	});
}