const express = require('express');
const app = express();
const assert = require('assert');
var bodyParser = require('body-parser');

var sqlite3 = require('sqlite3').verbose();
var squel = require("squel");
var db = new sqlite3.Database('./ketoboy.db');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//pages
app.get('/', home);

//api
app.post('/api/login', login);


app.listen(3000, () => console.log('Example app listening on port 3000'));

function home(req, res) {
  res.sendFile(__dirname + '/pages/index.html');
}

function login(req, res) {
  db.serialize(function() {  
    let username = req.body.username;
    let password = req.body.password;

    let query = 
      squel.select()
        .from('user')
        .field('username')
        .field('password')
        .where("username = '" + username + "'")
        .where("password = '" + password + "'")
        .toString();
    ;

    db.get(query, function(err, row) {
        if(err) res.send('error');
        if(row == undefined) {
          res.send('user/pass not found');
        }
        else {
          res.send('success');
        }
    });
  });
  
  db.close();
}