const sqlite3 = require('sqlite3').verbose();
const squel = require('squel');

module.exports = {
  getCalories: getCalories,
  importTest: importTest,
  addCalories: addCalories
}

function getCalories(startDate, endDate, userId, cb) {
  var db = new sqlite3.Database('./ketoboy.db');

  db.serialize(function() {  
    let query = 
      squel.select()
        .from('calorie')
        .field('calorie')
        .field('timestamp')
        .where('user_id = ' + userId)
        .where('timestamp > "' + startDate + '"')
        .where('timestamp < "' + endDate + '"')
        .toString();

    db.all(query, function(err, rows) {
        if(err) res.send('error');
        if(rows == undefined) {
          return cb(false);
        }
        else {
          return cb(rows);
        }
    });
  });
  
  db.close();
}

function importTest() {
  console.log('complete');
}

function addCalories(calories, timestamp, userId, cb) {
  var db = new sqlite3.Database('./ketoboy.db');

  db.serialize(function() {  
    let query = 
      squel.insert()
      .into("calorie")
      .set("calorie", calories)
      .set("timestamp", timestamp)
      .set("user_id", userId)
      .toString()

    db.exec(query, function(err) {
      if(err) res.send('error');
      return cb('success');
    })
  });
  
  db.close();
}