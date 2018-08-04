angular.module('ketoboy')
  .controller('WeekPickerController', WeekPickerController);

  WeekPickerController.$inject = ['$http', '$window', 'moment', '_', 'TimeService'];

function WeekPickerController($http, $window, moment, _, TimeService) {
  let ctrl = this;
  ctrl.months = moment().localeData().months();
  ctrl.chosenMonth = ctrl.months[moment().weekday(0).month()];

  ctrl.updateSundays = function() {
    ctrl.chosenMonthNumber = moment().month(ctrl.chosenMonth).month();
    ctrl.sundays = TimeService.getSundays(ctrl.chosenMonthNumber);
    ctrl.chosenSunday = ctrl.sundays[0] == ctrl.chosenSunday ? ctrl.chosenSunday : ctrl.sundays[0];
  };

  ctrl.submit = function() {
    ctrl.chosenDate = moment().month(ctrl.chosenMonthNumber).date(ctrl.chosenSunday).year(2018).format('YYYY-MM-DD');
    ctrl.updateGraph(ctrl.chosenDate);
  };

  ctrl.updateSundays();
  ctrl.chosenSunday = moment().weekday(0).date();
  
  ctrl.$onInit = function() {
    ctrl.submit();
  };
} 