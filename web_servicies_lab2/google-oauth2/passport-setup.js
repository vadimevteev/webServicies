  const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: '933273125696-3de410a0c46rkc5rjjosn0ubafbnk8je.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
