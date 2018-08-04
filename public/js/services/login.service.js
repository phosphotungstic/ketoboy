angular.module('ketoboy')
  .factory('LoginService', LoginService);

  LoginService.$inject = ['$http', 'JWTService'];

function LoginService($http, JWTService) {
  return {
    login: login,
    isLoggedIn: isLoggedIn,
    logout: logout
  }
  
  function login(user) {
    let headers = new Headers();
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
    if(JWTService.get() == null) {
      return false;
    }

    let date = new Date();
    return date.getTime() < JWTService.getExpiration();
  }

  function logout() {
    JWTService.remove();
  }
}