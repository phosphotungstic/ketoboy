angular.module('ketoboy')
  .factory('LoginService', LoginService);

  LoginService.$inject = ['$http', 'JWTService'];

function LoginService($http, JWTService) {
  return {
    login: login,
    isLoggedIn: isLoggedIn
  }
  
  function login(user) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return $http.post('/login', user, {headers: headers})
      .then(function(res) {
        if(res.data.token) {
          JWTService.set(res.data.token);
          console.log(JWTService.get());
        }
      });
  }

  function isLoggedIn() {
    var date = new Date();
    return date.getTime() < JWTService.getExpiration();
  }
}