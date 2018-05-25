const express = require('express');
const app = express();
const assert = require('assert');
const bodyParser = require('body-parser');

const sqlite3 = require('sqlite3').verbose();
const squel = require("squel");

app.use(express.static('public'));
app.use('/scripts/angular', express.static('node_modules/angular'));
app.use('/scripts/angular-route', express.static('node_modules/angular-route'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//pages
app.get('/', index);
app.get('/home', home);

//api
app.post('/api/login', login);


app.listen(3000, () => console.log('Example app listening on port 3000'));

function index(req, res) {
  res.sendFile(__dirname + '/pages/index.html');
}

function login(req, res) {
  var db = new sqlite3.Database('./ketoboy.db');
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

    db.get(query, function(err, row) {
        if(err) res.send('error');
        if(row == undefined) {
          console.log('undef');
          res
            .status(401)
            .send('user/pass not found');
        }
        else {
          console.log('send file');
          res
            .status(200)
            .send('authorized');
        }
    });
  });
  
  db.close();
}

function home(req, res) {
  res.sendFile(__dirname + '/pages/home.html');
}
