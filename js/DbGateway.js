const sqlite = require('better-sqlite3');
const squel = require('squel');

module.exports = {
  getCalories: getCalories,
  deleteCalorie: deleteCalorie,
  importTest: importTest,
  getDetailedCalorieInfo: getDetailedCalorieInfo,
  addCalories: addCalories,
  getMaxCalories: getMaxCalories,
  updateMaxCalories: updateMaxCalories
};

function getCalories(startDate, endDate, userId) {
  let db = new sqlite('./ketoboy.db');

  let query =
    squel.select()
      .from('calorie')
      .field('calorie')
      .field('timestamp')
      .where('user_id = ' + userId)
      .where('timestamp > "' + startDate + '"')
      .where('timestamp < "' + endDate + '"')
      .where('removed_at isnull')
      .order("timestamp")
      .toString();

  let calories = db.prepare(query).all();
  db.close();
  return calories;
}

function deleteCalorie(calorieId, time, userId) {
  let db = new sqlite('./ketoboy.db');

  let query =
    squel.update()
      .table('calorie')
      .set('removed_at', time)
      .where('calorie_id = ' + calorieId)
      .where('user_id = ' + userId)
      .toString();

  db.prepare(query).run();
  db.close();
}

function getDetailedCalorieInfo(chosenDate, userId) {
  let db = new sqlite('./ketoboy.db');

  let query =
    squel.select()
      .from('calorie')
      .field('calorie_id')
      .field('calorie')
      .field('note')
      .field('timestamp')
      .where('user_id = ' + userId)
      .where('timestamp >= "' + chosenDate + ' 00:00:00"')
      .where('timestamp <= "' + chosenDate + ' 23:59:59"')
      .where('removed_at isnull')
      .toString();

  let detailedCalories = db.prepare(query).all();
  db.close();
  return detailedCalories;
}

function importTest() {
  console.log('complete');
}

function addCalories(calories, timestamp, note, userId) {
  let db = sqlite('./ketoboy.db');
  note = note ? note : null;

  let query =
    squel.insert({replaceSingleQuotes: true})
      .into("calorie")
      .set("calorie", calories)
      .set("timestamp", timestamp)
      .set("user_id", userId)
      .set("note", note)
      .toString();

  db.prepare(query).run();
  db.close();
}

function getMaxCalories(userId) {
  let db = new sqlite('./ketoboy.db');

  let query =
    squel.select()
      .from('max_calorie')
      .field('max_calorie')
      .where('user_id = ' + userId)
      .toString();

  let maxCalories = db.prepare(query).get();
  db.close();
  return maxCalories;
}

function updateMaxCalories(calories, userId) {
  let db = new sqlite('./ketoboy.db');

  let query = squel.update()
    .table("max_calorie")
    .set("max_calorie", calories)
    .where("user_id = " + userId)
    .toString();

  db.prepare(query).run();
  db.close();
}