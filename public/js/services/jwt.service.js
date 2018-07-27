angular.module('ketoboy')
  .factory('JWTService', JWTServiceFactory);

function JWTServiceFactory($cookies, $http) {
  return {
    set: set,
    get: get,
    getExpiration: getExpiration,
    remove: remove
  }
  
  function set(jwt) {
    $cookies.put('jwt', jwt);
  }

  function get() {
    return $cookies.get('jwt');
  }

  function remove() {
    $cookies.remove('jwt');
  }

  function getExpiration() {
    if($cookies.get('jwt') == undefined) return false;
    return JSON.parse(atob($cookies.get('jwt').split('.')[1])).exp * 1000;
  }
}