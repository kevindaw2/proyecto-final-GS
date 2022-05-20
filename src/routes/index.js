/**
* Home
*/
const express = require('express');
const router = express.Router(); 
const pool = require('../db');
const passport = require('passport');


router.get('/', async(req, res) => { 
    res.render('main', {layout: 'index'}); //index.hbs < inside main.hbs
});

router.post('/',
passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/'
})
);

router.post('/add', async(req, res) => {
    const {nombre, equipos, numeros} = req.body; //a partir del formulario se obtienen los atributos
    const nuevoTorneo = { //nuevo objecto con propiedades 
        nombre, 
        equipos,
        numeros
    };

    await pool.query('INSERT INTO torneos SET ?', [nuevoTorneo]);
});

module.exports = router; 