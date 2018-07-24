angular.module('ketoboy')
  .controller('InsertCalorieController', InsertCalorieController);

InsertCalorieController.$inject = ['$http', '$window', 'RequestService', 'moment'];

function InsertCalorieController($http, $window, RequestService, moment) {
  var ctrl = this;
  ctrl.showError = false;

   ctrl.dateInput = new Date(moment().toISOString());
   ctrl.timeInput = new Date(moment().seconds(0).milliseconds(0).toISOString());

  ctrl.submit = function() {
    var date = moment(ctrl.dateInput).format('YYYY-MM-DD');
    var time = moment(ctrl.timeInput).format('hh:mm:00');

    var fullTimestamp = date + " " + time;

    RequestService.addCalories(ctrl.calories, fullTimestamp)
      .then(function() {
        ctrl.calories = "";
        ctrl.timestamp = "";
      })
      .catch(function(e) {
        console.log(e);
      });
  }
}