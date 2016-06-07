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


.factory('eventoService', function(servicoAcad){
	eventService = {};
	eventService.url = function(){
		var urlevent =  servicoAcad.urlBase +'evento';
		return urlevent;
	}
	return eventService;
})


.factory('servicoAcad', function(){
	var servicoAcad = {};
  var servico = 'http://apiacad.azurewebsites.net/api/';
	servicoAcad.urlBase = servico;
   servicoAcad.colocarUsuarioNaSession = function (user) {
		 var usuario = angular.toJson(user);
	   localStorage.setItem("user",usuario);
   }
   servicoAcad.pegarUsuarioSession = function () {
		 var user = localStorage.getItem("user");
     if(user !== null)
      return angular.fromJson(user);
   }
    return servicoAcad;
})

.service('BlankService', [function(){

}]);
