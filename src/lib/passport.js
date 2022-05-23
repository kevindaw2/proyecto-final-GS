const res = require('express/lib/response');
const passport = require('passport');
const Stratergy = require('passport-local').Strategy;
const {pool} = require('../db');
const helpers = require('../lib/helpers');

passport.use('local.signup', new Stratergy({ //local signup
    usernameField: 'correo',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, correo, password, done) => {
    
    const newUser = {
        correo,
        password
    };

    newUser.password = await helpers.encryptPassword(password); 
    const result = await pool.query('INSERT INTO usuarios SET ?', [newUser]);
    newUser.id = result.insertId; 
    console.log(result);
    return done(null, newUser); //callback
}));

passport.serializeUser((user, done) => { //serializar id 
    done(null, user.id); //callback para guardar el id 
}); 

passport.deserializeUser(async (id, done) => {
    const row = pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    done(null, row[0]); //callback a partir del id para cerrar la sesion
})