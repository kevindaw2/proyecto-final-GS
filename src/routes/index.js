/**
* Home
*/
const express = require('express');
const router = express.Router(); 
const path = require('path');
const mysql = require('mysql');
const pool = require('../db');

router.get('/', async(req, res) => {
    const torneos = await pool.query('SELECT * FROM torneos'); 
    //res.render('views/index', {torneos}); 
    res.sendFile(path.resolve(__dirname, '../views/index.html'));
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