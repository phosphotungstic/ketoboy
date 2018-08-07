angular.module('ketoboy')
  .factory('TimeService', TimeService);

TimeService.$inject = ['moment', '_'];

function TimeService(moment, _) {
  return {
    getMonths: getMonths,
    getDates: getDates,
    getCurrentMonth: getCurrentMonth,
    getCurrentDate: getCurrentDate,
    getMonthForBeginningOfWeek: getMonthForBeginningOfWeek,
    getSundays: getSundays,
    generateDates: generateDates,
  };

  function getFirstSunday(month) {
    let firstSunday = moment().month(month).startOf('month');
    let dayDiff = 7 - firstSunday.day();
    return firstSunday.add(dayDiff, 'days');
  }

  function getSundays(month) {
    let sundays = [];
    let sunday = getFirstSunday(month);
    sundays.push(sunday.date());
    while(sunday.add(7, 'days').month() == month) {
      sundays.push(sunday.date())
    }
    return sundays;
  }

  function generateDates(beginningDate) {
    let first = moment(beginningDate);
    let dates = [];
    _.each(_.range(0,7), function(addDay) {
      dates.push(first.clone().add(addDay, 'days').format("YYYY-MM-DD"));
    });
    return dates;
  }

  function getMonths() {
    return moment().localeData().months();
  }

  function getDates(month, year) {
    let maxDate = 31;
    while(moment([year, month, maxDate].join('-')).isValid() === false) {
      maxDate--;
    }
    return _.range(1, maxDate);
  }

  function getCurrentDate() {
    return moment().date();
  }

  function getMonthForBeginningOfWeek() {
    return getMonths()[moment().weekday(0).month()]
  }

  function getCurrentMonth() {
    return getMonths()[moment().month()];
  }

}