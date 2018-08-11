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

function getCalories(span, startDate, userId) {
  let start = new Date(startDate);
  let end = new Date(start.setDate(start.getDate() + getDayLength(span)));
  let endDate = end.toISOString().substr(0, 10);
  return dbgateway.getCalories(startDate, endDate, userId);
}

function getGroupedCaloriesByDay(span, startDate, userId) {
  return sumCaloriesByDay(getCalories(span, startDate, userId));
}

function getDetailedCalorieInfo(chosenDate, userId, cb) {
  return dbgateway.getDetailedCalorieInfo(chosenDate, userId, cb);
}

function sumCaloriesByDay(calorieData) {
  this.calorieSums = {};
  _.each(calorieData, function(row) {
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
  return this.calorieSums;
}

function getDayLength(span) {
  switch(span) {
    case 'week':
      return 7;
    case 'day':
      return 1;
  }
}

function addCalories(calories, timestamp, note, userId) {
  dbgateway.addCalories(calories, timestamp, note, userId);
}

function getMaxCalories(userId) {
  return dbgateway.getMaxCalories(userId);
}

function updateMaxCalories(calories, userId) {
  dbgateway.updateMaxCalories(calories, userId);
}