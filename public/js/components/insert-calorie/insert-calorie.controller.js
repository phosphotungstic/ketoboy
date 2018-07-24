angular.module('ketoboy')
  .controller('InsertCalorieController', InsertCalorieController);

InsertCalorieController.$inject = ['$http', '$window', 'RequestService'];

function InsertCalorieController($http, $window, RequestService) {
  var ctrl = this;
  ctrl.showError = false;

  ctrl.dateInput = new Date();
  ctrl.timeInput = "23:04";

  ctrl.submit = function() {
    RequestService.addCalories(ctrl.calories, ctrl.timestamp)
      .then(function() {
        ctrl.calories = "";
        ctrl.timestamp = "";
      })
      .catch(function(e) {
        console.log(e);
      });
  }
}