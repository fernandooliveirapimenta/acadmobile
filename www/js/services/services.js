angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])


.factory('Auth', function($firebaseAuth,$state,servicoAcad){
	var endpoint = 'https://authacad.firebaseio.com/';
	var usersRef = new Firebase(endpoint);
	var service = {};
  service.auth= $firebaseAuth(usersRef);

	 service.loginAcad = function(user){
		 	var urlLogin =  servicoAcad.urlBase + 'account/?email='+user.email+'&senha='+user.senha;
			return urlLogin;
	 }
 service.logoff = function(){
   $state.go("login");
 };
	return service;
})


.factory('instituicaoService', function(servicoAcad,loadingService){
	instService = {};
	instService.buscarInstituicao = function(){
		var user = servicoAcad.pegarUsuarioSession();
    var urlInstituicao = '';
		if(user != null){
		 urlInstituicao =  servicoAcad.urlBase +'instituicao'+'/'+user.IdUsuario+'?perfil='+user.PerfilUsuario;

	 }else{
			urlInstituicao = null;
			loadingService.close();
		}
		return urlInstituicao ;
	}
	return instService;
})
.factory('loadingService', function($ionicLoading){
	loadingService = {};

	loadingService.open = function(){
		$ionicLoading.show({
			content: 'Loading',
			animation: 'fade-in',
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 0
		});
	}

	loadingService.close = function(){
		$ionicLoading.hide();
	}

	return loadingService;
})


.factory('eventoService', function(servicoAcad, $cordovaCalendar,toastService){
	eventService = {};
	eventService.eventFlagDeixar = 0;

	eventService.url = function(){
		var user = servicoAcad.pegarUsuarioSession();
		var urlevent =  servicoAcad.urlBase +'evento';
		if(user != null)
		  urlevent +='/'+user.IdUsuario+'?perfil='+user.PerfilUsuario;

		return urlevent;
	}

	eventService.createEvent = function(evento) {
		var teste = eventService.findEvent(evento);


			$cordovaCalendar.createEvent({
					title: evento.Titulo,
					location: evento.Categoria.Nome,
					notes: evento.Descricao,
					startDate: new Date(evento.DataInicial),
					endDate: new Date(evento.DataFinal)
			}).then(function (result) {
				 toastService.show('Evento adiconado ao seu calendário');
			}, function (err) {
					console.error("There was an error: " + err);
			});



	}

	eventService.deleteEvent = function(evento){
		var teste = eventService.findEvent(evento);

			$cordovaCalendar.deleteEvent({
				title: evento.Titulo,
				location: evento.Categoria.Nome,
				notes: evento.Descricao,
				startDate: new Date(evento.DataInicial),
				endDate: new Date(evento.DataFinal)
		  }).then(function (result) {
		    toastService.show('Removido do seu calendário');
		  }, function (err) {
		    console.log(err);
		  });


	}


eventService.findEvent = function(evento){
	var retorno = {};
	$cordovaCalendar.findEvent({
		title: evento.Titulo,
		location: evento.Categoria.Nome,
		notes: evento.Descricao,
		startDate: new Date(evento.DataInicial),
		endDate: new Date(evento.DataFinal)
  }).then(function (result) {
		retorno = result;
  }, function (err) {

  });

	return retorno
}


	return eventService;
})
.factory('noticiaService', function(servicoAcad){
	noticiaService = {};

	noticiaService.url = function(){
		var user = servicoAcad.pegarUsuarioSession();
		var urlnoticia =  servicoAcad.urlBase +'noticia';
		if(user != null)
		  urlnoticia +='/'+user.IdUsuario+'?perfil='+user.PerfilUsuario;

		return urlnoticia;
	}
	return noticiaService;
})

.factory('toastService', function($cordovaToast){

 toast = {};
toast.show = function(msg){
	$cordovaToast.show(msg, 'long', 'center').then(function(success) {
		// success
	}, function (error) {
		// error
	});
}
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
   }
   servicoAcad.pegarUsuarioSession = function () {
		 var user = localStorage.getItem("user");
     if(user != null){
			 return angular.fromJson(user);
		 }
		 else{
			 return null;
		 }

   }
    return servicoAcad;
})

.service('BlankService', [function(){

}]);
