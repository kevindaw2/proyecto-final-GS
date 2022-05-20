const passport = require('passport');
const Stratergy = require('passport-local');
const pool = require('../db');
const helpers = require('../lib/helpers');

passport.use('local.signup', new Stratergy({ //local signup
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    console.log(username);
    
    const { fullname } = req.body;
    const newUser = {
        username,
        password,
        fullname
    };

    newUser.password = await helpers.encryptPassword(password); 
    var usr = JSON.stringify(usr);
    console.log('passport newUser');
    const result = await pool.query('INSERT INTO usuarios SET ?', [newUser]);
    console.log('resultado' +  result);
}));

// passport.serializeUser((user, done) => {

// }); 