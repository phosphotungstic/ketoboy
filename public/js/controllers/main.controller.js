angular.module('ketoboy')
  .controller('MainController', MainController);

  MainController.$inject = ['LoginService'];

function MainController(LoginService) {
  var ctrl = this;
  
  ctrl.isLoggedIn = function() {
    return LoginService.isLoggedIn();
  }
}