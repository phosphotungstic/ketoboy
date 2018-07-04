const dbgateway = require("./DbGateway.js");
const _ = require("underscore");
const moment = require("moment");

module.exports = {
  getCalories: getCalories,
  getGroupedCaloriesByDay: getGroupedCaloriesByDay
}

function getCalories(span, startDate, userId, cb) {
  var start = new Date(startDate);
  var end = new Date(start.setDate(start.getDate() + getDayLength(span)));
  var endDate = end.toISOString().substr(0, 10);

  var calories = dbgateway.getCaloriesDb(startDate, endDate, userId, cb);
}

function getGroupedCaloriesByDay(span, startDate, userId, cb) {
  getCalories(span, startDate, userId, sumCaloriesByDay(cb));
}

function sumCaloriesByDay(cb) {
  return function(rows) {
    this.calorieSums = {};
    _.each(rows, function(row) {
      var calorieDate = new Date(row.timestamp);
      var calorieDateString = calorieDate.toISOString().substr(0, 10);
      if(calorieDateString in this.calorieSums) {
        this.calorieSums[calorieDateString] += row.calorie
      }
      else {
        this.calorieSums[calorieDateString] = row.calorie;
      }
    }, this);
    //console.log(this.calorieSums);
    cb(this.calorieSums);
  }
}

function getDayLength(span) {
  switch(span) {
    case 'week':
      return 7;
    case 'day':
      return 1;
  }
}