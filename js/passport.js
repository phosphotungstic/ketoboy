const passport = require('passport');
const LocalStrategy  = require('passport-local').Strategy;
const sqlite = require('better-sqlite3');
const squel = require("squel");
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;


passport.use(new LocalStrategy(function(username, password, cb) {
  cb(null, checkUser(username, password));
}));

let cookieExtractor = function(req) {
  return req.cookies['jwt'];
};

passport.use(new JWTStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: 'oof'
},
  function (jwtPayload, cb) {
    cb(null, jwtPayload);
  }
));

let checkUser = function(username, password) {
  let db = new sqlite('./ketoboy.db');

  let query =
    squel.select()
      .from('user')
      .field('username')
      .field('password')
      .field('user_id')
      .where("username = '" + username + "'")
      .where("password = '" + password + "'")
      .toString();

  return db.prepare(query).get()
};