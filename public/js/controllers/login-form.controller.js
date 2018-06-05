angular.module('ketoboy')
  .controller('LoginFormController', LoginFormController);

LoginFormController.$inject = ['$http', '$window', 'JWTService'];

function LoginFormController($http, $window, JWTService) {
  var ctrl = this;
  ctrl.showError = false;

  ctrl.submit = function(user) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    $http.post('/api/login', user, {headers: headers})
      .then(function(res) {
        if(res.data.auth) {
          JWTService.set(res.data.token);
          console.log(JWTService.get());
        }
        $window.location.href = '/home';
      })
      .catch(function() {
        ctrl.showError = true;
      });
  }
}