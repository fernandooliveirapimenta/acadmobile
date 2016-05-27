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

        $http.get('http://rest-service.guides.spring.io/greeting')
       .success(function(response){
         $scope.servico  = response;
            console.log(response.id);
       }).error(function(erro){
         console.log(erro);
       });


})
.controller('profileCtrl', function($scope, Auth) {
   Auth.ref.$onAuth(function(authData){
        $scope.authData = authData;
     });
   
  $scope.logoff = function(){
      Auth.logoff();
    }
}) 
   
.controller('instituicaoCtrl', function($scope) {

}) 
.controller('esqueceuSenhaCtrl', function($scope, $state) {

  $scope.esqueciSenha = function(){
   $state.go("login");
  };

  $scope.email = '';
  
})       
.controller('loginCtrl', function($scope, Auth, $state) {
     
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

      // $scope.loginGoogle = function(){
      //   Auth.loginGoogle();
      // }
});
 