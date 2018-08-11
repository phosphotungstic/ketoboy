angular.module('ketoboy')
  .factory('RequestService', RequestService);

  RequestService.$inject = ['$http'];

function RequestService($http) {
  return {
    getCalories: getCalories,
    addCalories: addCalories,
    getMaxCalories: getMaxCalories,
    updateMaxCalories: updateMaxCalories,
    getDetailedCalorieInfo: getDetailedCalorieInfo
  };
  
  function getCalories(span, date) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return $http.get('/calories?span=' + span + '&date=' + date, {headers: headers});
  }

  function addCalories(calories, timestamp, note) {
    let data = {
      calories: calories,
      timestamp: timestamp,
      note: note
    };
    return $http.post('/calories', data);
  }

  function getMaxCalories() {
    return $http.get('/maxCalories');
  }

  function updateMaxCalories(calories) {
    return $http.patch('/maxCalories', {maxCalories: calories});
  }

  function getDetailedCalorieInfo(date) {
    return $http.get('/detailedCalories?date=' + date);
  }
}