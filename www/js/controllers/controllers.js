 angular.module('app.controllers', [])

.controller('eventosCtrl', function($scope, $http,eventoService,servicoAcad,loadingService) {
  $scope.eventos = {};  $scope.repo = '';  $scope.flagacao = 0;  $scope.user = null;   $scope.agendados = 0;
  $scope.carregar = function(){
    $scope.agendados =  eventoService.quantidade();  $scope.user = servicoAcad.pegarUsuarioSession();
    loadingService.open();
    $http.get(eventoService.url()).success(function(data){
      console.log(data);   $scope.eventos = angular.fromJson(data);    $scope.repo = servicoAcad.repository;
         loadingService.close();    $scope.alteraragenda(data);
    }).error(function(erro){
      console.log(erro); loadingService.close();
    }).finally(function() {
       $scope.$broadcast('scroll.refreshComplete');      loadingService.close();
     });
  }

   $scope.participar = function(evento){  evento.Usuario.Estado = 1;     evento.IdCurso=null;   eventoService.createEvent(evento, $scope);   };
   $scope.deixar = function(evento){ evento.IdCurso=null;      evento.Usuario.Estado = 0;     eventoService.deleteEvent(evento,$scope);   };
   $scope.agendado = function(evento){  evento.IdCurso = 8;     var retorno = eventoService.findEvent(evento);    evento.Usuario.Estado= retorno;  };
   $scope.alteraragenda = function (data){
     var msg =false;
     angular.forEach(data, function(evento) {
           eventoService.alterar(evento,$scope);
   });

   };

   $scope.carregar();
})





.controller('noticiasCtrl', function($scope, $http, loadingService,noticiaService,servicoAcad) {
  $scope.noticias = [];  $scope.repo = '';  loadingService.open();
  $scope.carregar = function(){
    loadingService.open();
    $http.get(noticiaService.url()).success(function(data){
      console.log(data); $scope.noticias = angular.fromJson(data);  $scope.repo = servicoAcad.repository;  loadingService.open();
    }).error(function(erro){
      console.log(erro); loadingService.close();
    }).finally(function() { $scope.$broadcast('scroll.refreshComplete');   loadingService.close(); });
  }
   $scope.carregar();
})



.controller('profileCtrl', function($scope, Auth,servicoAcad, loadingService) {
   Auth.auth.$onAuth(function(authData){  $scope.authData = authData;   });
  $scope.logoff = function(){   Auth.logoff();   }
    $scope.carregar = function(){
      loadingService.open();   $scope.user = servicoAcad.pegarUsuarioSession();  $scope.$broadcast('scroll.refreshComplete');   loadingService.close();
    }
    $scope.carregar();
})

.controller('instituicaoCtrl', function($scope,instituicaoService,$state,$http,loadingService) {
  $scope.instituicao = {};  loadingService.open();   $scope.falgConta = 0;
  $scope.carregar = function (){ loadingService.open();
    if(instituicaoService.buscarInstituicao()!= null){
      $http.get(instituicaoService.buscarInstituicao()).success(function(data){
        console.log(data); $scope.instituicao = angular.fromJson(data);  $scope.falgConta =1; loadingService.close();   $state.go("tabsController.instituicao"); $scope.$broadcast('scroll.refreshComplete');
      }).error(function(erro){
        console.log(erro);
        loadingService.close();
      });
    }
  };
  $scope.criarconta = function(){  $state.go("criarconta"); };   $scope.carregar();
})




.controller('esqueceuSenhaCtrl', function($scope, $state,Auth, $http,loadingService,$timeout) {
  $scope.email = '';  $scope.flag = false; $scope.mensagem =''; $scope.cencelarvoltar = 'cancelar';

  $scope.esqueciSenha = function(email){
    loadingService.open();
    $http.post(Auth.esqueceusenha(email)).success(function(data){
      $scope.flag = true;  loadingService.close(); $scope.cencelarvoltar = 'voltar';
      $timeout(function () {
      $scope.flag=false;
    }, 6000);

    }).error(function(erro){
      console.log(erro);   loadingService.close();  $scope.mensagem = erro; $scope.cencelarvoltar = 'cancelar';
      $timeout(function () {
      $scope.mensagem='';
    }, 5000);
    });

   };

        $scope.sumir = function () { $scope.mensagem = ''; };
        $scope.voltar = function(){ $state.go("login"); $scope.cencelarvoltar = 'cancelar'};

})


.controller('criarContaCtrl', function($scope, $state,loadingService,$timeout) {
  loadingService.open();
  $timeout(function () { loadingService.close();}, 10000);
  $scope.voltar = function(){ $state.go("login"); };
})



.controller('loginCtrl', function($scope, Auth, $timeout,$state,servicoAcad,$http,loadingService) {
      Auth.auth.$onAuth(function(authData){
      if(authData ===null){  console.log("Usuario nao autentica"); $state.go("login");  }
      else{ console.log("autenticado"); console.log(authData); $state.go("tabsController.eventos"); }
      $scope.authData = authData;
     });
       $scope.loginFace = function() {
        if($scope.authData === null || $scope.authData.google ) { Auth.auth.$authWithOAuthPopup("facebook",function(error, authData ){
              if (error) { console.log("Login Failed!", error); } else { $state.go("tabsController.eventos"); }
          });

        }
        else{$state.go("tabsController.eventos");}

      };
      $scope.loginGoogle = function() {
        if($scope.authData === null || $scope.authData.facebook ) { Auth.auth.$authWithOAuthPopup("google",function(error, authData ){
              if (error) { console.log("Login Failed!", error); } else { $state.go("tabsController.eventos"); }
          });
        }
        else{ $state.go("tabsController.eventos");}
    };
     $scope.esqueceuSenha = function(){ $state.go("esqueceusenha");};
     $scope.user ={ email: '', senha: '' }; $scope.mensagem = '';  $scope.userSession = {};
     $scope.loginAcad = function(user){
       loadingService.open();
      $http.get(Auth.loginAcad(user)).success(function(data){
               console.log(data);  $scope.userSession = angular.fromJson(data); servicoAcad.colocarUsuarioNaSession($scope.userSession);
         console.log($scope.userSession);  $scope.user.email = ''; $scope.user.senha = '';  loadingService.close();
          $state.go("tabsController.eventos");
       }).error(function(erro){
         $state.go("login");  $scope.mensagem = erro; loadingService.close();
          $timeout(function () {
          $scope.sumir();
        }, 2000);
         console.log(erro);
       });
     };
     $scope.sumir = function () { $scope.mensagem = ''; };
     $scope.criarconta = function(){ $state.go("criarconta"); };
});
