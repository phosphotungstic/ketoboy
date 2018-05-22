angular.module('ketoboy')
  .controller('LoginFormController', LoginFormController);

LoginFormController.$inject = ['$http'];

function LoginFormController($http) {
  var ctrl = this;

  ctrl.submit = function(user) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    $http.post('/api/login', user, {headers: headers})
      .then(function() {
        console.log('success');
      })
      .catch(function() {
        console.log('oof');
      });
  }
}