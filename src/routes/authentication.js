/**
 * rutas
 * authenticación de usuarios
 * passport auth
 * 
 * passport documentation: https://www.passportjs.org/tutorials/password/session/
 */

const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const router = express.Router();
const pool = require('../db');

passport.use(new LocalStrategy(function verify(username, password, cb) { //passport middleware to authenticate users
    pool.query('SELECT * FROM usuarios WHERE correo = ?', [username], function (err, row) {
        if (err) { return cb(err); }
        if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }

        crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function (err, hashedPassword) {
            if (err) { return cb(err); }
            if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
                return cb(null, false, { message: 'Incorrect username or password.' });
            }
            return cb(null, row);
        });
    });
}));

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
    console.log(res.body); 
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function (err, hashedPassword) {
        if (err) { return next(err); }
        pool.query('INSERT INTO users (correo, hashed_password, salt) VALUES (?, ?, ?)', [
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

module.exports = router;