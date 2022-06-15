const passport = require('passport');
const Stratergy = require('passport-local').Strategy;
const { pool } = require('../db');
const encrypter = require('./encrypter');

passport.use('local.signin', new Stratergy({
    usernameField: 'correo',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, correo, password, done) => {

    const rows = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    if (rows.length > 0) {
        console.log("correo encontrado");
        const user = rows[0];
        const matchedPassword = await encrypter.matchPassword(password, user.password);
        if (matchedPassword) {
            done(null, user, req, req.flash('succes', 'Bienvenido' + user.correo));
        } else {
            done(null, false, req.flash('error', 'Contraseña incorrecta'));
        }
    } else {
        console.log("correo no encontrado");
        return done(null, false, req.flash('error', 'Usuario no encontrado'));
    }

}));

passport.use('local.signup', new Stratergy({ //local signup
    usernameField: 'correo',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, correo, password, done) => {

    const newUser = {
        correo,
        password
    };

    newUser.alias = req.body.alias;
    newUser.nombre = req.body.nombre;
    newUser.apellido = req.body.apellido;
    newUser.correo = correo;
    newUser.telefono = req.body.telefono;

    console.log("se viene el req");
    console.log(req.body);

    newUser.password = await encrypter.encryptPassword(password);
    const result = await pool.query('INSERT INTO usuarios SET ?', [newUser]);
    newUser.id_usuario = result.insertId;
    return done(null, newUser); //callback
}));

passport.serializeUser((user, done) => {
    console.log("serializing user");
    done(null, user.id_usuario);
});

passport.deserializeUser(async (id_usuario, done) => {
    const rows = await pool.query('SELECT * FROM usuarios WHERE id_usuario =?', [id_usuario]);
    done(null, rows[0]);
});