const sqlite3 = require('sqlite3').verbose();
const squel = require('squel');

module.exports = {
  getCaloriesDb: getCaloriesDb,
  importTest: importTest
}

function getCaloriesDb(startDate, endDate, userId, cb) {
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

function getDayLength(span) {
  switch(span) {
    case 'week':
      return 7;
    case 'day':
      return 1;
  }
}

function importTest() {
  console.log('complete');
}