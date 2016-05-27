angular.module('app.controllers', [])
  
.controller('eventosCtrl', function($scope) {

})
   
.controller('noticiasCtrl', function($scope) {

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
.controller('loginCtrl', function($scope, Auth, $state) {
     
      Auth.ref.$onAuth(function(authData){
      if(authData ===null){
        console.log("Usuario nao autentica")
      }
      else
      {
        console.log("autenticado");
        console.log(authData);
        $state.go("tabsController.eventos");

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
 