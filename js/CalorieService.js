const dbgateway = require("./DbGateway.js");
const _ = require("underscore");
const moment = require("moment");

module.exports = {
  getCalories: getCalories,
  getGroupedCaloriesByDay: getGroupedCaloriesByDay,
  getDetailedCalorieInfo: getDetailedCalorieInfo,
  addCalories: addCalories,
  getMaxCalories: getMaxCalories,
  updateMaxCalories: updateMaxCalories
};

function getCalories(span, startDate, userId, cb) {
  let start = new Date(startDate);
  let end = new Date(start.setDate(start.getDate() + getDayLength(span)));
  let endDate = end.toISOString().substr(0, 10);
  dbgateway.getCalories(startDate, endDate, userId, cb);
}

function getGroupedCaloriesByDay(span, startDate, userId, cb) {
  getCalories(span, startDate, userId, sumCaloriesByDay(cb));
}

function getDetailedCalorieInfo(chosenDate, userId, cb) {
  dbgateway.getDetailedCalorieInfo(chosenDate, userId, cb);
}

function sumCaloriesByDay(cb) {
  return function(rows) {
    this.calorieSums = {};
    _.each(rows, function(row) {
      let calorieDate = moment(row.timestamp);
      let calorieDateString = calorieDate.format("YYYY-MM-DD");
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

function addCalories(calories, timestamp, note, userId, cb) {
  dbgateway.addCalories(calories, timestamp, note, userId, cb);
}

function getMaxCalories(userId, cb) {
  dbgateway.getMaxCalories(userId, cb);
}

function updateMaxCalories(calories, userId, cb) {
  dbgateway.updateMaxCalories(calories, userId, cb);
}