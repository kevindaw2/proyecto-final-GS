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
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));  

//get profile
router.get('/profile', (req, res) => {
    res.send('Your profile');
});

module.exports = router;