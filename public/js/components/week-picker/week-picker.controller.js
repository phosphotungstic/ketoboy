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
    sunday = getFirstSunday(ctrl.chosenMonthNumber);
    ctrl.sundays.push(sunday.date());
    while(sunday.add(7, 'days').month() == ctrl.chosenMonthNumber) {
      ctrl.sundays.push(sunday.date())
    };
    ctrl.chosenSunday = ctrl.sundays[0] == ctrl.chosenSunday ? ctrl.chosenSunday : ctrl.sundays[0];
  }

  ctrl.submit = function() {
    ctrl.chosenDate = moment().month(ctrl.chosenMonthNumber).date(ctrl.chosenSunday).year(2018).format('YYYY-MM-DD');
  }

  function getFirstSunday(month) {
    var firstSunday = moment().month(month).startOf('month');
    dayDiff = 7 - firstSunday.day();
    return firstSunday.add(dayDiff, 'days');
  }

  ctrl.updateSundays();
  ctrl.chosenSunday = _.find(ctrl.sundays, function(sunday) {
    return sunday + 7 > moment().date()
  });
} 