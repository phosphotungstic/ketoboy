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

//pages
// app.get('/home', home);
app.get('/test', test);
//api
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

// function home(req, res, next) {
//   console.log('home');
//   res.redirect(__dirname + '/pages/home.html');
// }

function test(req, res, next) {
  res.send('test complete');
}

function checkAuth(successCB, failureCB, req, res, next) {
  passport.authenticate('jwt', function(err, user, info) {
    if(err) return next(err);
    if(user) {
      console.log('logged in');
      successCB(user, res);
    }
    else {
      console.log('not logged in');
      failureCB(user, res);
    }
  })(req, res, next);
}

function loginRedirect(user, res) {
  res.redirect('/');
}

function homeRedirect(user, res) {
  res.redirect('/home');
}