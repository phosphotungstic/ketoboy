const dbgateway = require("./DbGateway.js");
const _ = require("underscore");
const moment = require("moment");

module.exports = {
  getWeights: getWeights,
  addWeight: addWeight,
  updateWeight: updateWeight
};

function getWeights(span, startDate, userId) {
  let start = new Date(startDate);
  let end = new Date(start.setDate(start.getDate() + getDayLength(span)));
  console.log(end);
  let endDate = end.toISOString().substr(0, 10);
  let weights = dbgateway.getWeights(startDate, endDate, userId);

  let keyedDateWeights = {};
  _.each(weights, function(row) {
    let weightDate = moment(row.timestamp);
    let weightDateString = weightDate.format("YYYY-MM-DD");
    keyedDateWeights[weightDateString] = row.weight;
  });
  return keyedDateWeights;
}

function getDayLength(span) {
  switch(span) {
    case 'week':
      return 7;
    case 'day':
      return 1;
  }
}

function addWeight(weight, timestamp, userId) {
  dbgateway.addWeight(weight, timestamp, userId);
}

function updateWeight(weight, timestamp, userId) {
  dbgateway.updateWeight(weight, timestamp, userId)
}