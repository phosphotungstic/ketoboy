angular.module('ketoboy')
  .factory('RequestService', RequestService);

  RequestService.$inject = ['$http'];

function RequestService($http) {
  return {
    getCalories: getCalories,
    addCalories: addCalories
  }
  
  function getCalories(span, date) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return $http.get('/calories?span=' + span + '&date=' + date, {headers: headers});
  }

  function addCalories(calories, timestamp) {
    return $http.post('/calories', {
      calories: calories,
      timestamp: timestamp
    });
  }
}