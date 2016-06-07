 angular.module('app.controllers', [])

.controller('eventosCtrl', function($scope,$http,eventoService) {

  $scope.eventos = [];

  $scope.carregar = function(){
    $http.get(eventoService.url()).success(function(data){
      console.log(data);
      $scope.eventos = angular.fromJson(data);
    }).error(function(erro){
      console.log(erro);
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
        Auth.auth.$authWithOAuthPopup('facebook');
      };

      $scope.loginGoogle = function() {
      Auth.auth.$authWithOAuthPopup('google');
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

});
