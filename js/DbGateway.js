const sqlite = require('better-sqlite3');
const squel = require('squel');

module.exports = {
  getCalories: getCalories,
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

  return db.prepare(query).all();
}

function getDetailedCalorieInfo(chosenDate, userId) {
  let db = new sqlite('./ketoboy.db');

  let query =
    squel.select()
      .from('calorie')
      .field('calorie')
      .field('note')
      .field('timestamp')
      .where('user_id = ' + userId)
      .where('timestamp >= "' + chosenDate + ' 00:00:00"')
      .where('timestamp <= "' + chosenDate + ' 23:59:59"')
      .where('removed_at isnull')
      .toString();

  return db.prepare(query).all();
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

  db.prepare(query).exec();
}

function getMaxCalories(userId) {
  let db = new sqlite('./ketoboy.db');

  let query =
    squel.select()
      .from('max_calorie')
      .field('max_calorie')
      .where('user_id = ' + userId)
      .toString();

  return db.prepare(query).get();
}

function updateMaxCalories(calories, userId) {
  let db = new sqlite('./ketoboy.db');

  let query = squel.update()
    .table("max_calorie")
    .set("max_calorie", calories)
    .where("user_id = " + userId)
    .toString();

  db.prepare(query).exec();
}