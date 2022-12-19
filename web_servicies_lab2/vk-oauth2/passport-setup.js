const passport = require('passport');
const VkStrategy = require('passport-vkontakte').Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new VkStrategy(
    {
      clientID: '51507966',
      clientSecret: 'kijyDq3o8hO8siqtJHPt',
      callbackURL: 'http://localhost:3002/vk/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
