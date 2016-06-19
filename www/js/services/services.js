angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])


.factory('Auth', function($firebaseAuth,$state,servicoAcad){
	var endpoint = 'https://authacad.firebaseio.com/';	var usersRef = new Firebase(endpoint); 	var service = {};
  service.auth= $firebaseAuth(usersRef);
	 service.loginAcad = function(user){var urlLogin =  servicoAcad.urlBase + 'account/?email='+user.email+'&senha='+user.senha;return urlLogin;
 };
	 service.esqueceusenha = function(email){ var urlequeceusenha = servicoAcad.urlBase + 'account/?userEmail='+email;return urlequeceusenha; };
   service.logoff = function(){ $state.go("login"); };
	 return service;
})


.factory('instituicaoService', function(servicoAcad,loadingService){
	instService = {};
	instService.buscarInstituicao = function(){
		var user = servicoAcad.pegarUsuarioSession(); var urlInstituicao = '';
		if(user != null){ urlInstituicao =  servicoAcad.urlBase +'instituicao'+'/'+user.IdUsuario+'?perfil='+user.PerfilUsuario; }
		else{	urlInstituicao = null;loadingService.close();		}
		return urlInstituicao ;
	};
	return instService;
})




.factory('loadingService', function($ionicLoading){
	loadingService = {};
	loadingService.open = function(){$ionicLoading.show({	content: 'Loading',	animation: 'fade-in', showBackdrop: true,
			maxWidth: 200,showDelay: 0	});	};
	loadingService.close = function(){	$ionicLoading.hide();	};
	return loadingService;
})




.factory('eventoService', function(servicoAcad, $cordovaCalendar,toastService){
	eventService = {};	eventService.eventFlagDeixar = 0;	eventService.agendados = new getAgendados();
	eventService.url = function(){
		var user = servicoAcad.pegarUsuarioSession(); var urlevent =  servicoAcad.urlBase +'evento';
		if(user !== null)
		  urlevent +='/'+user.IdUsuario+'?perfil='+user.PerfilUsuario;

		return urlevent;
	};

	eventService.createEvent = function(evento, $scope) {
		var user = servicoAcad.pegarUsuarioSession();
		var flag = eventService.agendados.find(user.IdUsuario,evento);
	     if(flag == null){
			$cordovaCalendar.createEventInteractively({
					title: evento.Titulo,
					location: evento.Categoria.Nome,
					notes: evento.Descricao,
					startDate: new Date(evento.DataInicial),
					endDate: new Date(evento.DataFinal)
			}).then(function (result) {

				 eventService.addAgendamento(evento);
				 $scope.agendados =  eventService.quantidade();


			}, function (err) {
					console.error("There was an error: " + err);
			});
    }
		else {
			toastService.show('Você já participa desse evento');
		}
	};
var flagMsg = false;
	eventService.alterar = function(eventonovo, $scope){

       	var user = servicoAcad.pegarUsuarioSession();
        var eventoantigo =eventService.agendados.eventoantigo(user.IdUsuario,eventonovo);
				if(eventoantigo !== null)				{

					$cordovaCalendar.modifyEvent({
						title: eventoantigo.Titulo,
						location: eventoantigo.Categoria.Nome,
						notes: eventoantigo.Descricao,
						startDate: new Date(eventoantigo.DataInicial),
						endDate: new Date(eventoantigo.DataFinal),
				    newTitle: eventonovo.Titulo,
				    newLocation: eventonovo.Categoria.Nome,
				    newNotes: eventonovo.Descricao,
				    newStartDate: new Date(eventonovo.DataInicial),
				    newEndDate: new Date(eventonovo.DataFinal)
				  }).then(function (result) {
						$scope.agendados =  eventService.quantidade();
							flagMsg = true;
				  }, function (err) {
				     console.log(err);
				   });
				}
				return flagMsg;
 }
	eventService.deleteEvent = function(evento, $scope){
     if(eventService.removeAgendamento(evento, $scope)){
				 $cordovaCalendar.deleteEvent({
	 				title: evento.Titulo,
	 				location: evento.Categoria.Nome,
	 				notes: evento.Descricao,
	 				startDate: new Date(evento.DataInicial),
	 				endDate: new Date(evento.DataFinal)
	 		  }).then(function (result) {
	 		    toastService.show('Removido do seu calendário');
					$scope.agendados =  eventService.quantidade();

	 		  }, function (err) {
	 		    console.log(err);
	 		  });
		 }
		 else {
			 toastService.show('Você ainda não participa desse evento');
		 }
	};

	eventService.removeAgendamento = function(evento){
    var retorno = false; 	var user = servicoAcad.pegarUsuarioSession();
		if(user!==null){ retorno= eventService.agendados.remove(user.IdUsuario,evento);	}

			return retorno;
	};

	eventService.addAgendamento=function(evento){
		var retorno = false;
		var user = servicoAcad.pegarUsuarioSession();
		if(user !== null){ var agendamento= {IdUsuario:user.IdUsuario,evento}; retorno = eventService.agendados.add(agendamento);

		}
		return retorno;
	};

	eventService.findEvent = function(evento){
		var retorno = 1 //btnExcluir abilitado
		var user = servicoAcad.pegarUsuarioSession();
		if(user !== null){
			var agendamento = eventService.agendados.find(user.IdUsuario, evento);
       if(agendamento ===null)
			    retorno =0;
		}
		return retorno;
	};

 eventService.quantidade = function(){
	 var retorno = 0;	 var user = servicoAcad.pegarUsuarioSession();
	 if(user !== null){ var agendamento = eventService.agendados.agendamentos(user.IdUsuario);if(agendamento !==null) retorno = agendamento;}
	 return retorno;
 };
	return eventService;
})





.factory('noticiaService', function(servicoAcad){
	noticiaService = {};
	noticiaService.url = function(){
		var user = servicoAcad.pegarUsuarioSession();		var urlnoticia =  servicoAcad.urlBase +'noticia';
		if(user != null)
		  urlnoticia +='/'+user.IdUsuario+'?perfil='+user.PerfilUsuario;
		  return urlnoticia;
	};
	return noticiaService;
})





.factory('toastService', function($cordovaToast){
 toast = {};
toast.show = function(msg){
	$cordovaToast.show(msg, 'long', 'center').then(function(success) {
	}, function (error) {
	});
};
 return toast;
})




.factory('servicoAcad', function(){
	var servicoAcad = {};
  var servico = 'http://apiacad.azurewebsites.net/api/';
	servicoAcad.repository= 'https://acadeventos.blob.core.windows.net';
	servicoAcad.urlBase = servico;
   servicoAcad.colocarUsuarioNaSession = function (user) {
		 var usuario = angular.toJson(user);
	   localStorage.setItem("user",usuario);
   };
   servicoAcad.pegarUsuarioSession = function () {
		 var user = localStorage.getItem("user");
     if(user != null){
			 return angular.fromJson(user);
		 }
		 else{
			 return null;
		 }
   };
	 servicoAcad.colocarAuthSession = function (authData) {
		var authData = angular.toJson(authData);
		localStorage.setItem("auth",authData);
	};
	 servicoAcad.pegarAuthSession = function () {
		var authData = localStorage.getItem("auth");
		 if(authData != null){
			return angular.fromJson(authData);
		}
		else{
			return null;
		}
	};
    return servicoAcad;
})

.service('BlankService', [function(){

}]);
