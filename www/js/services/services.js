angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])
.factory('Auth', function($firebaseAuth){
	var endpoint = 'https://authacad.firebaseio.com';
	var usersRef = new Firebase(endpoint);
	
	var service = {};

       service.loginFace = function(){
       
		          usersRef.authWithOAuthPopup("facebook", function(error, authData) {
		      if (error) {
		        console.log("Login Failed!", error);
		      } else {
		        console.log("Authenticated successfully with payload:", authData);
		      }
    });

     };

     service.loginGoogle = function (){
		            usersRef.authWithOAuthPopup("google", function(error, authData) {
		      if (error) {
		        console.log("Login Failed!", error);
		      } else {
		        console.log("Authenticated successfully with payload:", authData);
		      }
    });

   };
	service.ref=new $firebaseAuth(usersRef);

	return service;
})

.service('BlankService', [function(){

}]);

