 angular.module('app.controllers', [])

.controller('eventosCtrl', function($scope) {

})
.controller('noticiasCtrl', function($scope, $http) {
   $scope.servico = {};

   // $http.get('http://rest-service.guides.spring.io/greeting')
   //      .then(function(response){
   //        $scope.servico  = response.data;
   //          console.log(response.data.id);
   //      });

      //   $http.get('http://rest-service.guides.spring.io/greeting')
      //  .success(function(response){
      //    $scope.servico  = response;
      //       console.log(response.id);
      //  }).error(function(erro){
      //    console.log(erro);
      //  });


})
.controller('profileCtrl', function($scope, Auth,servicoAcad) {
   Auth.ref.$onAuth(function(authData){
        $scope.authData = authData;
     });
  $scope.logoff = function(){
      Auth.logoff();
    }

    $scope.user = servicoAcad.pegarUsuarioSession();
})

.controller('instituicaoCtrl', function($scope,instituicaoService,$state) {
  $scope.instituicao = {};

//TODO  receber usuário
  $scope.carregar = function (){
    instituicaoService.buscarInstituicao().success(function(data){
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
.controller('loginCtrl', function($scope, Auth, $state,servicoAcad, $window) {

      Auth.ref.$onAuth(function(authData){
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
     $scope.loginRedes = function(authData){
      Auth.loginRedes(authData);
     }
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
       Auth.loginAcad(user).success(function(data){
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



      // $scope.loginGoogle = function(){
      //   Auth.loginGoogle();
      // }
});
