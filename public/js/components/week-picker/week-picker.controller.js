angular.module('ketoboy')
  .controller('WeekPickerController', WeekPickerController);

  WeekPickerController.$inject = ['$http', '$window', 'moment', '_'];

function WeekPickerController($http, $window, moment, _) {
  var ctrl = this;
  ctrl.months = moment().localeData().months();
  ctrl.chosenMonth = ctrl.months[moment().month()];

  ctrl.updateSundays = function() {
    ctrl.sundays  = [];
    ctrl.chosenMonthNumber = moment().month(ctrl.chosenMonth).month();
    sunday = moment().month(ctrl.chosenMonthNumber).day(0);
    ctrl.sundays.push(sunday.date());
    while(sunday.add(7, 'days').month() == ctrl.chosenMonthNumber) {
      ctrl.sundays.push(sunday.date())
    };
    console.log(ctrl.sundays);
  }

  ctrl.updateSundays();
  ctrl.chosenSunday = _.find(ctrl.sundays, function(sunday) {
    return sunday + 7 > moment().date()
  });
  console.log(ctrl.chosenSunday);
} 