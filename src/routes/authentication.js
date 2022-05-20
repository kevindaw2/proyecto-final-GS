/**
 * rutas
 * authenticación de usuarios
 * passport auth
 * passport documentation: https://www.passportjs.org/tutorials/password/session/
 * 
 * It’s extremely flexible and modular and can be dropped in to any Express-based web application, and can authenticate users via many different authentication mechanisms called “strategies”.
 * Strategies are packaged as individual modules so you can choose which strategies to employ, without creating unnecessary dependencies.
 * passport sql tutorial: https://github.com/joeltmiller/SQL-Passport-Guide
*/

const express = require('express');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const router = express.Router();
const pool = require('../db');
const passport = require('passport');

//passport config LocalStratergy 
passport.use('local', new LocalStrategy({ passReqToCallback: true, usernameField: 'username' },
    function (req, username, password, done) {
        console.log('calling passport lg');
        var query = pool.query('SELECT * from usuarios WHERE correo = ?', [username]); //comprobacion
        console.log(query);
    }
));

//sessions
passport.serializeUser(function (user, cb) { //in 
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username });
    });
});

passport.deserializeUser(function (user, cb) { //out
    process.nextTick(function () {
        return cb(null, user);
    });
});

//old localStratergy 
// passport.use('local.signup', new LocalStratergy({ //local signup
//     usernameField: 'username',
//     passwordField: 'password',
//     passReqToCallback: true
// }, async (req, username, password, done) => {
//     console.log(username);

//     const { fullname } = req.body;
//     const newUser = {
//         username,
//         password,
//         fullname
//     };

//     newUser.password = await helpers.encryptPassword(password);
//     var usr = JSON.stringify(usr);
//     console.log('passport newUser');
//     const result = await pool.query('INSERT INTO usuarios SET ?', [newUser]);
//     console.log('resultado' + result);
// }));


//get login
router.get('/login', function (req, res, next) {
    res.render('main', { layout: 'login' }); //login.hbs
});

//post login password
router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

//get signup
router.get('/signup', (req, res) => {
    res.render('main', { layout: 'signup' }); //signup.hbs 
});

//post signup
router.post('/signup', function (req, res, next) {

    //encrypt de la contraseña 
    var salt = crypto.randomBytes(16);

    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function (err, hashedPassword) {
        if (err) { return next(err); }
        db.run('INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
            req.body.username,
            hashedPassword,
            salt
        ], function (err) {
            if (err) { return next(err); }
            var user = {
                id: this.lastID,
                username: req.body.username
            };
            req.login(user, function (err) {
                if (err) { return next(err); }
                res.redirect('/');
            });
        });
    });
});



// passport.authenticate('local.signup', { 
//     successRedirect: '/profile', 
//     failureRedirect: '/signup', 
//     failureFlash: true
// });

router.get('/profile', (req, res) => {
    res.send('Your profile');
});

module.exports = router;