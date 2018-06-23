angular.module('ketoboy')
  .factory('RequestService', RequestService);

  RequestService.$inject = ['$http', 'JWTService'];

function RequestService($http, JWTService) {
  return {
    getCalories: getCalories
  }
  
  function getCalories(span, date) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return $http.get('/calories?span=' + span + '&date=' + date, {headers: headers});
  }
}