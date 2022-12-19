const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')
const cookieSession = require('cookie-session')
require('./passport-setup');

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))


app.use(bodyParser.json())

app.use(cookieSession({
    name: 'application-session',
    keys: ['key1', 'key2']
}))

const isLoggedIn = (req, res, next) => {
    if(req.user){
        next();
    } else {
        res.sendStatus(401);
    }
}

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.send('You are not logged in!'))
app.get('/failed', (req, res) => res.send('You Failed to log on!'))
app.get('/good', isLoggedIn, (req, res) => res.send(`Welcome mr ${req.user._json.login}`))

app.get('/yandex', passport.authenticate('yandex'));

app.get('/yandex/callback', passport.authenticate('yandex', { failureRedirect: '/failed' }),
  function(req, res) {
    res.redirect('/good');
});

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

app.listen(3001, () => console.log(`Example app listening on port ${3001}`))

