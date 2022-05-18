/**
* Home
*/
const express = require('express');
const async = require('hbs/lib/async');
const router = express.Router(); 
const path = require('path');
const pool = require('../db');


router.get('/', async(req, res) => { 
    res.render('main', {layout: 'index'}); //index.hbs < inside main.hbs
});

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