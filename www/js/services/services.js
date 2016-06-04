angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])
.factory('Auth', function($firebaseAuth,$state,servicoAcad,$http){
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

		 service.loginAcad = function(user){
			 	var urlLogin =  servicoAcad.urlBase + 'account/?email='+user.email+'&senha='+user.senha;
				return $http.get(urlLogin);
		 }

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
.factory('instituicaoService', function($http,servicoAcad){

	instService = {};

	instService.buscarInstituicao = function(){
		var user = servicoAcad.pegarUsuarioSession();
		var urlInstituicao =  servicoAcad.urlBase +'instituicao'+'/'+user.IdUsuario+'?perfil='+user.PerfilUsuario;
		return $http.get(urlInstituicao);
	}
	return instService;
})

.factory('servicoAcad', function($cookieStore){


	var servicoAcad = {};
  var servico = 'http://apiacad.azurewebsites.net/api/';

	servicoAcad.urlBase = servico;

   servicoAcad.colocarUsuarioNaSession = function (user) {
     $cookieStore.put('usuario', user);

   }
   servicoAcad.pegarUsuarioSession = function () {
      return $cookieStore.get('usuario');
   }
   servicoAcad.deletarUsuarioSession = function () {
     $cookieStore.remove('usuario');
   }
    return servicoAcad;


})

.service('BlankService', [function(){

}]);
