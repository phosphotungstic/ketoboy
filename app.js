const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const cookieParser = require('cookie-parser');

require('./js/passport.js');
const calorieService = require('./js/CalorieService.js');
app.use(passport.initialize());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//api
app.get('/test', passport.authenticate('jwt', {session: false}), test);
app.post('/login', login);
app.get('/calories', passport.authenticate('jwt', {session: false}), getCalories);
app.get('/detailedCalories', passport.authenticate('jwt', {session: false}), getDetailedCalorieInfo);
app.post('/calories', passport.authenticate('jwt', {session: false}), addCalories); 
app.get('/maxCalories', passport.authenticate('jwt', {session: false}), getMaxCalories);
app.patch('/maxCalories', passport.authenticate('jwt', {session: false}), updateMaxCalories);

app.listen(3000, () => console.log('Example app listening on port 3000'));

function login(req, res, next) {
  passport.authenticate('local', function(err, user) {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ status: 'error', code: 'unauthorized' });
    } else {
      var token = jwt.sign(user, 'oof', {
        expiresIn: 86400 // 1d
      });
      return res.json({ token: token });
    }
  })(req, res, next);
}

function test(req, res) {
  res.send(req.user);
}

function getCalories(req, res) {
  // url format:
  // /calories?span=week&date=2018-05-06&groupedby=day
  res.send(calorieService.getGroupedCaloriesByDay(req.query.span, req.query.date, req.user.user_id));
}

function getDetailedCalorieInfo(req, res) {
  // url format:
  // /detailedCalories?date=2018-08-07
  console.log(req.query);
  res.send(calorieService.getDetailedCalorieInfo(req.query.date, req.user.user_id));
}

function addCalories(req) {
  console.log(req.body);
  console.log(req.user);
  calorieService.addCalories(req.body.calories, req.body.timestamp, req.body.note, req.user.user_id);
}

function getMaxCalories(req, res) {
  res.send(calorieService.getMaxCalories(req.user.user_id));
}

function updateMaxCalories(req, res) {
  console.log(req.body);
  res.send(calorieService.updateMaxCalories(req.body.maxCalories, req.user.user_id));
}