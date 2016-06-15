 angular.module('app.controllers', [])

.controller('eventosCtrl', function($scope,$http,eventoService,servicoAcad) {

  $scope.eventos = [];
  $scope.repo = '';

  $scope.carregar = function(){
    $http.get(eventoService.url()).success(function(data){
      console.log(data);
      $scope.eventos = angular.fromJson(data);
        $scope.repo = servicoAcad.repository;

    }).error(function(erro){
      console.log(erro);
    }).finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  }

   $scope.carregar();
})
.controller('noticiasCtrl', function($scope, $http) {
   $scope.servico = {};

})
.controller('profileCtrl', function($scope, Auth,servicoAcad) {
   Auth.auth.$onAuth(function(authData){
        $scope.authData = authData;
     });
  $scope.logoff = function(){
      Auth.logoff();
    }

    $scope.user = servicoAcad.pegarUsuarioSession();
})

.controller('instituicaoCtrl', function($scope,instituicaoService,$state,$http) {
  $scope.instituicao = {};

  $scope.carregar = function (){
    $http.get(instituicaoService.buscarInstituicao()).success(function(data){
      console.log(data);
      $scope.instituicao = angular.fromJson(data);
       $state.go("tabsController.instituicao");
    }).error(function(erro){
      console.log(erro);
    });

  };
  $scope.carregar();


})
.controller('esqueceuSenhaCtrl', function($scope, $state) {

  $scope.esqueciSenha = function(){
   $state.go("login");
  };
  $scope.email = '';

})
.controller('criarContaCtrl', function($scope, $state) {

  $scope.voltar = function(){
   $state.go("login");
  };

})
.controller('loginCtrl', function($scope, Auth, $state,servicoAcad,$http) {

      Auth.auth.$onAuth(function(authData){
      if(authData ===null){
        console.log("Usuario nao autentica");
        $state.go("login");
      }
      else{
        console.log("autenticado");
        console.log(authData);
        $state.go("tabsController.eventos");

      }
      $scope.authData = authData;
     });

       $scope.loginFace = function() {
        if($scope.authData === null) {

          Auth.auth.$authWithOAuthPopup("facebook",function(error, authData ){
              if (error) {
                console.log("Login Failed!", error);
              } else {
                  $state.go("tabsController.eventos");
              }
          });

        }
        else{
          $state.go("tabsController.eventos");
        }

      };


      $scope.loginGoogle = function() {
        if($scope.authData === null ) {

          Auth.auth.$authWithOAuthPopup("google",function(error, authData ){
              if (error) {
                console.log("Login Failed!", error);
              } else {
                  $state.go("tabsController.eventos");
              }
          });

        }
        else{
          $state.go("tabsController.eventos");
        }
    };

     $scope.esqueceuSenha = function(){
      $state.go("esqueceusenha");
     };

     $scope.user ={
       email: '',
       senha: ''
     };
     $scope.mensagem = '';
     $scope.userSession = {};

     $scope.loginAcad = function(user){
      $http.get(Auth.loginAcad(user)).success(function(data){
         console.log(data);
         $scope.userSession = angular.fromJson(data);
         servicoAcad.colocarUsuarioNaSession($scope.userSession);
         console.log($scope.userSession);
         $scope.user.email = '';
         $scope.user.senha = '';
          $state.go("tabsController.eventos");
       }).error(function(erro){
         $state.go("login");
         $scope.mensagem = erro;
         console.log(erro);
       });
     }
     $scope.sumir = function () {
       $scope.mensagem = '';
     }

     $scope.criarconta = function(){
       $state.go("criarconta");
     }

});
