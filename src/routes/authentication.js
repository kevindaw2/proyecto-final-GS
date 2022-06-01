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
const router = express.Router();
const passport = require('passport');
const { pool } = require('../db');

//get login
router.get('/login', function (req, res) {
    res.render('main', { layout: 'login' }); //login.hbs
});

//post login password
router.post('/login', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash:true
    })(req, res, next);
});

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
router.get('/profile', async(req, res) => {
    const id = req.user.id_usuario; 
    console.log("idusuario");
    console.log(id);
    const torneos = await pool.query('SELECT * FROM torneos where id_jugador =?', id);
    res.render('main', { layout: 'profile', torneos}); //index.hbs < inside main.hbs
});

//logout
router.get('/logout', (req, res) => {
    req.logOut(); 
    res.redirect('/');
});

module.exports = router; 