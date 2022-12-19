const passport = require('passport');
const YandexStrategy = require('passport-yandex').Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new YandexStrategy(
    {
      clientID: '1cc8c0a72b264a74953353231ec9572a',
      clientSecret: 'd83ec934411c415b80362ca38d7b5f66',
      callbackURL: 'http://localhost:3001/yandex/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
