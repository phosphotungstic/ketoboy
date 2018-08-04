angular.module('ketoboy')
  .controller('MainController', MainController);

  MainController.$inject = ['$window', 'LoginService'];

function MainController($window, LoginService) {
  let ctrl = this;
  
  ctrl.$onInit = function() {
    if(LoginService.isLoggedIn()) {
      $window.location.href = '#!/home';
    }
  };

  ctrl.isLoggedIn = function() {
    return LoginService.isLoggedIn();
  };

  ctrl.logout = function() {
    LoginService.logout();
  };
}