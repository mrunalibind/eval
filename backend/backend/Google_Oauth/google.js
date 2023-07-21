
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport=require("passport")

passport.use(new GoogleStrategy({
    clientID: '993899016712-vuhgqrljh0rn5q7o6li3d0rt0ti3c60l.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:8050/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    return cb(null, 'user');
  }
));

module.exports=passport;