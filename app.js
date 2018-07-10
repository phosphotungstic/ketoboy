const express = require('express');
const app = express();
const assert = require('assert');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const cookieParser = require('cookie-parser');

require('./js/passport.js');
const calorieService = require('./js/CalorieService.js');
app.use(passport.initialize());

const sqlite3 = require('sqlite3').verbose();
const squel = require('squel');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())

//api
app.get('/test', passport.authenticate('jwt', {session: false}), test);
app.post('/login', login);
app.get('/calories', passport.authenticate('jwt', {session: false}), getCalories);
app.post('/calories', passport.authenticate('jwt', {session: false}), addCalories); 

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
  res.send(req.user);
}

function getCalories(req, res, next) {
  // url format:
  // /calories?span=week&date=2018-05-06&groupedby=day
  calorieService.getGroupedCaloriesByDay(req.query.span, req.query.date, req.user.user_id, sendResult(res));
}

function addCalories(req, res, next) {
  console.log(req.body);
  console.log(req.user);
  calorieService.addCalories(req.body.calories, req.body.timestamp, req.user.user_id, sendResult(res));
}

function sendResult(res) {
  return function(results) {
    //console.log(results);
    res.send(results);
  }
}

function testCallBack(a, b, c) {
  console.log(a);
  console.log(b);
  console.log(c);
}

