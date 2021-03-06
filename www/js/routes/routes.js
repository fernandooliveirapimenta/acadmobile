angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



      .state('tabsController.eventos', {
    url: '/Eventos',
    views: {
      'tab1': {
        templateUrl: 'templates/eventos.html',
        controller: 'eventosCtrl'
      }
    }
  })

  .state('tabsController.noticias', {
    url: '/Noticia',
    views: {
      'tab3': {
        templateUrl: 'templates/noticias.html',
        controller: 'noticiasCtrl'
      }
    }
  })

  .state('tabsController.instituicao', {
    url: '/Instituicao',
    cache : false,
    views: {
      'tab2': {
        templateUrl: 'templates/instituicao.html',
        controller: 'instituicaoCtrl'
      }
    }
  })
  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true

  })

  .state('login', {
    url: '/Login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })
  .state('criarconta', {
    url: '/CriarConta',
    templateUrl: 'templates/criarconta.html',
    controller: 'criarContaCtrl'
  })
  .state('push', {
    url: '/Push',
    templateUrl: 'templates/push.html',
    controller: 'PushCtrl'
  })

  .state('tabsController.profile', {
    url: '/Profile',
    cache : false,
    views: {
      'tab4': {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
      }
    }
  })
  .state('esqueceusenha', {
    url: '/EsqueceuSenha',
    templateUrl: 'templates/esqueceusenha.html',
    controller: 'esqueceuSenhaCtrl'

  })

$urlRouterProvider.otherwise('/Login')



});
