	  window.fbAsyncInit = function() {
	    FB.init({
	      appId      : '1671252833107790',
	      xfbml      : true,
	      version    : 'v2.4'
	    });
  	  function onLogin(response) {
  		  if (response.status == 'connected') {
  		    FB.api('/me?fields=first_name', function(data) {
  		      var welcomeBlock = document.getElementById('fb-welcome');
  		      welcomeBlock.innerHTML = 'Hello, ' + data.first_name + '!';
            console.log(JSON.stringify(data));
            user = data;
            levelUp(null, null, '111111', 1);
  		    });
  		  }
  		}
      FB.getLoginStatus(function(response) {
        // Check login status on load, and if the user is
        // already logged in, go directly to the welcome message.
        if (response.status == 'connected') {
          onLogin(response);
        } else {
          // Otherwise, show Login dialog first.
          FB.login(function(response) {
            onLogin(response);
          }, {scope: 'user_friends, email'});
        }
      });	    // ADD ADDITIONAL FACEBOOK CODE HERE
    };



	  (function(d, s, id){
	     var js, fjs = d.getElementsByTagName(s)[0];
	     if (d.getElementById(id)) {return;}
	     js = d.createElement(s); js.id = id;
	     js.src = "//connect.facebook.net/en_US/sdk.js";
	     fjs.parentNode.insertBefore(js, fjs);
	   }(document, 'script', 'facebook-jssdk'));