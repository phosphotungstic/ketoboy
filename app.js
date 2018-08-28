const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const cookieParser = require('cookie-parser');

require('./js/passport.js');
const calorieService = require('./js/CalorieService.js');
const weightService = require('./js/WeightService.js');
app.use(passport.initialize());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//api
app.get('/test', passport.authenticate('jwt', {session: false}), test);
app.post('/login', login);

//calories api
app.get('/calories', passport.authenticate('jwt', {session: false}), getCalories);
app.delete('/calories', passport.authenticate('jwt', {session: false}), deleteCalories);
app.get('/detailedCalories', passport.authenticate('jwt', {session: false}), getDetailedCalorieInfo);
app.post('/calories', passport.authenticate('jwt', {session: false}), addCalories);
app.patch('/calories', passport.authenticate('jwt', {session: false}), updateCalorieInfo);
app.get('/maxCalories', passport.authenticate('jwt', {session: false}), getMaxCalories);
app.patch('/maxCalories', passport.authenticate('jwt', {session: false}), updateMaxCalories);

//weight api
app.get('/weights', passport.authenticate('jwt', {session: false}), getWeights);
app.post('/weights', passport.authenticate('jwt', {session: false}), addWeight);
app.patch('/weights', passport.authenticate('jwt', {session: false}), updateWeight);

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

function deleteCalories(req, res) {
  // url format:
  // /calories?id=22
  calorieService.deleteCalorie(req.query.id, req.user.user_id);
  res.send('success');
}

function getDetailedCalorieInfo(req, res) {
  // url format:
  // /detailedCalories?date=2018-08-07
  res.send(calorieService.getDetailedCalorieInfo(req.query.date, req.user.user_id));
}

function addCalories(req, res) {
  console.log(req.body);
  console.log(req.user);
  calorieService.addCalories(req.body.calories, req.body.timestamp, req.body.note, req.user.user_id);
  res.send('success');
}

function updateCalorieInfo(req, res) {
  console.log(req.body);
  console.log(req.user);
  calorieService.updateCalories(req.body.calories, req.body.timestamp, req.body.note, req.body.id, req.user.user_id);
}

function getMaxCalories(req, res) {
  res.send(calorieService.getMaxCalories(req.user.user_id));
}

function updateMaxCalories(req, res) {
  console.log(req.body);
  res.send(calorieService.updateMaxCalories(req.body.maxCalories, req.user.user_id));
}

function getWeights (req, res) {
  res.send(weightService.getWeights(req.query.span, req.query.date, req.user.user_id));
}

function addWeight (req, res) {
  weightService.addWeight(req.body.weight, req.body.timestamp, req.user.user_id);
}

function updateWeight (req, res) {
  weightService.updateWeight(req.body.weight, req.body.timestamp, req.user.user_id);
}