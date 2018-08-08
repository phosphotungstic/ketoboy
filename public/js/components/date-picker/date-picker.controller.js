angular.module('ketoboy')
  .controller('DatePickerController', DatePickerController);

DatePickerController.$inject = ['$http', '$window', 'moment', '_', 'TimeService'];

function DatePickerController($http, $window, moment, _, TimeService) {
  let ctrl = this;
  ctrl.months = TimeService.getMonths();
  ctrl.chosenMonth = TimeService.getCurrentMonth();
  ctrl.chosenMonthNumber = moment().month(ctrl.chosenMonth).month();
  ctrl.chosenDate = TimeService.getCurrentDate();
  ctrl.dates = TimeService.getDates(ctrl.chosenMonth, 2018);

  ctrl.updateDates = function() {
    ctrl.chosenMonthNumber = moment().month(ctrl.chosenMonth).month();
    ctrl.dates = TimeService.getDates(ctrl.chosenMonthNumber + 1, 2018);
  };

  ctrl.submit = function() {
    return;
  };

  ctrl.$onInit = function() {
    ctrl.submit();
  };
}