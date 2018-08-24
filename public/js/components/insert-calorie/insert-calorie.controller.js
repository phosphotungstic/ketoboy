angular.module('ketoboy')
  .controller('InsertCalorieController', InsertCalorieController);

InsertCalorieController.$inject = ['$http', '$window', 'RequestService', 'moment'];

function InsertCalorieController($http, $window, RequestService, moment) {
  let ctrl = this;

   ctrl.dateInput = new Date(moment().toISOString());
   ctrl.timeInput = new Date(moment().seconds(0).milliseconds(0).toISOString());

  ctrl.submit = function() {
    ctrl.errors = {};
    if(!ctrl.calories) {
      ctrl.showErrors = true;
      ctrl.errors.calories_required = true;
      return;
    }
    if(!Number.parseInt(ctrl.calories) || Number.parseInt(ctrl.calories) < 0) {
      ctrl.showErrors = true;
      ctrl.errors.invalid_input = true;
      return;
    }
    ctrl.showErrors = false;

    let date = moment(ctrl.dateInput).format('YYYY-MM-DD');
    let time = moment(ctrl.timeInput).format('HH:mm:00');

    let fullTimestamp = date + " " + time;

    RequestService.addCalories(ctrl.calories, fullTimestamp, ctrl.noteInput)
      .then(function() {
        ctrl.calories = "";
        ctrl.timestamp = "";
        ctrl.noteInput =  "";
      })
      .catch(function(e) {
        ctrl.hideError();
        console.log(e);
      });
  };

  ctrl.hideError = function() {
    ctrl.showError = false;
  }
}