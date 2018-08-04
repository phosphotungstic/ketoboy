angular.module('ketoboy')
  .factory('RequestService', RequestService);

  RequestService.$inject = ['$http'];

function RequestService($http) {
  return {
    getCalories: getCalories,
    addCalories: addCalories,
    getMaxCalories: getMaxCalories,
    updateMaxCalories: updateMaxCalories
  };
  
  function getCalories(span, date) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return $http.get('/calories?span=' + span + '&date=' + date, {headers: headers});
  }

  function addCalories(calories, timestamp) {
    let data = {
      calories: calories,
      timestamp: timestamp
    };
    return $http.post('/calories', data);
  }

  function getMaxCalories() {
    return $http.get('/maxCalories');
  }

  function updateMaxCalories(calories) {
    return $http.patch('/maxCalories', {maxCalories: calories});
  }
}