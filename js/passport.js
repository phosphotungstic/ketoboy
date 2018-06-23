const passport = require('passport');
const LocalStrategy  = require('passport-local').Strategy;
const sqlite3 = require('sqlite3').verbose();
const squel = require("squel");
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;


passport.use(new LocalStrategy(function(username, password, cb) {
  checkUser(username, password, cb);
}));

var cookieExtractor = function(req) {
  return req.cookies['jwt'];
}

passport.use(new JWTStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey   : 'oof'
},
  function (jwtPayload, cb) {
    cb(null, jwtPayload);
  }
));

var checkUser = function(username, password, cb) {
  var db = new sqlite3.Database('./ketoboy.db');
  db.serialize(function() {  
    let query = 
      squel.select()
        .from('user')
        .field('username')
        .field('password')
        .field('user_id')
        .where("username = '" + username + "'")
        .where("password = '" + password + "'")
        .toString();

    db.get(query, function(err, row) {
        if(err) res.send('error');
        if(row == undefined) {
          return cb(null, false);
        }
        else {
          return cb(null, row);
        }
    });
  });
  
  db.close();
}