angular.module('ketoboy')
  .factory('JWTService', JWTServiceFactory);

function JWTServiceFactory($cookies) {
  return {
    set: set,
    get: get
  }
  
  function set(jwt) {
    $cookies.put('jwt', jwt);
  }

  function get() {
    return $cookies.get('jwt');
  }
}