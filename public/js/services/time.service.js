angular.module('ketoboy')
  .factory('TimeService', TimeService);

TimeService.$inject = ['moment'];

function TimeService(moment) {
  return {
    getSundays: getSundays,
    generateDates: generateDates,
  }

  function getFirstSunday(month) {
    var firstSunday = moment().month(month).startOf('month');
    dayDiff = 7 - firstSunday.day();
    return firstSunday.add(dayDiff, 'days');
  }

  function getSundays(month) {
    var sundays = [];
    sunday = getFirstSunday(month);
    sundays.push(sunday.date());
    while(sunday.add(7, 'days').month() == month) {
      sundays.push(sunday.date())
    };
    return sundays;
  }

  function generateDates(beginningDate) {
    var first = moment(beginningDate);

    var dates = [];
    _.each(_.range(0,6), function(addDay) {
      dates.push(first.clone().add(addDay, 'days').format("YYYY-MM-DD"));
    });
    return dates;
  }

}