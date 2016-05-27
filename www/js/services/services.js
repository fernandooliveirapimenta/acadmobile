angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])
.factory('Auth', function($firebaseAuth,$state){
	var endpoint = 'https://authacad.firebaseio.com';
	var usersRef = new Firebase(endpoint);
	
	var service = {};

       service.loginRedes = function(authData){
				usersRef.authWithOAuthPopup(authData, function(error, authData) {
				      if (error) {
				        console.log("Login Failed!", error);
				      } else {
				        console.log("Authenticated successfully with payload:", authData);
				      }
		 });
     };

   //   service.loginGoogle = function (){
		 //            usersRef.authWithOAuthPopup("google", function(error, authData) {
		 //      if (error) {
		 //        console.log("Login Failed!", error);
		 //      } else {
		 //        console.log("Authenticated successfully with payload:", authData);
		 //      }
   //  });

   // };

   service.logoff = function(){
     $state.go("login");
   };

    service.ref=new $firebaseAuth(usersRef);

	return service;
})

.service('BlankService', [function(){

}]);

