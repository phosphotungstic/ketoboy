angular.module('ketoboy')
  .controller('LoginFormController', LoginFormController);

LoginFormController.$inject = ['$http', '$window', 'LoginService'];

function LoginFormController($http, $window, LoginService) {
  var ctrl = this;
  ctrl.showError = false;

  ctrl.submit = function(user) {
    LoginService.login(user)
      .then(function() {
        $window.location.href = '#!/home';
      })
      .catch(function(e) {
        console.log(e);
        if(e.status == 502) {
          ctrl.showServerError = true;
        }
        else if(e) {
          ctrl.showError = true;
        }
      });
  }
}