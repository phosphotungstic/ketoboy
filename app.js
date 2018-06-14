const express = require('express');
const app = express();
const assert = require('assert');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const cookieParser = require('cookie-parser');

require('./js/passport.js');

const sqlite3 = require('sqlite3').verbose();
const squel = require("squel");

app.use(express.static('public'));
app.use('/scripts/angular', express.static('node_modules/angular'));
app.use('/scripts/angular-route', express.static('node_modules/angular-route'));
app.use('/scripts/angular-cookies', express.static('node_modules/angular-cookies'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())

//api
app.get('/test', test);
app.post('/login', login);


app.listen(3000, () => console.log('Example app listening on port 3000'));

function login(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ status: 'error', code: 'unauthorized' });
    } else {
      var token = jwt.sign(user, 'oof', {
        expiresIn: 10080 // in seconds
      });
      return res.json({ token: token });
    }
  })(req, res, next);
}

function test(req, res, next) {
  res.send('test complete');
}