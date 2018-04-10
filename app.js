const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'ketoboy';

app.get('/', home);
app.listen(3000, () => console.log('Example app listening on port 3000'));

function home(req, res) {
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    getTestUser(db, function(users){
      res.send(users);
    });
  });
}

function getTestUser(db, callback) {
  const collection = db.collection('user');
  collection.find({}).toArray(function(err, users) {
    callback(users);
  });
}
