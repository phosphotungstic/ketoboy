angular.module('ketoboy')
  .controller('InsertCalorieController', InsertCalorieController);

InsertCalorieController.$inject = ['$http', '$window', 'RequestService', 'moment'];

function InsertCalorieController($http, $window, RequestService, moment) {
  let ctrl = this;
  ctrl.showError = false;

   ctrl.dateInput = new Date(moment().toISOString());
   ctrl.timeInput = new Date(moment().seconds(0).milliseconds(0).toISOString());

  ctrl.submit = function() {
    let date = moment(ctrl.dateInput).format('YYYY-MM-DD');
    let time = moment(ctrl.timeInput).format('hh:mm:00');

    let fullTimestamp = date + " " + time;

    RequestService.addCalories(ctrl.calories, fullTimestamp)
      .then(function() {
        ctrl.calories = "";
        ctrl.timestamp = "";
      })
      .catch(function(e) {
        console.log(e);
      });
  };
}