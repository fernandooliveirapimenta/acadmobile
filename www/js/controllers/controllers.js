angular.module('app.controllers', [])
  
.controller('eventosCtrl', function($scope) {

})
   
.controller('noticiasCtrl', function($scope) {

})
   
.controller('instituicaoCtrl', function($scope) {

})       
.controller('loginCtrl', function($scope, Auth, $location) {
     
      Auth.ref.$onAuth(function(authData){
      if(authData ===null){
        console.log("Usuario nao autentica")
      }
      else
      {
        console.log("autenticado");
        console.log(authData);
        $location.path("/Eventos");

      }

      $scope.authData = authData;
     });
     
     $scope.loginFace = function(){
      Auth.loginFace();
     }

      $scope.loginGoogle = function(){
        Auth.loginGoogle();
      }
});
 