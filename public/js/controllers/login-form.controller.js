angular.module('ketoboy')
  .controller('LoginFormController', LoginFormController);

LoginFormController.$inject = ['$http', '$window'];

function LoginFormController($http, $window) {
  var ctrl = this;

  ctrl.submit = function(user) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    $http.post('/api/login', user, {headers: headers})
      .then(function() {
        $window.location.href = '/home';
      })
      .catch(function() {
        console.log('oof');
      });
  }
}