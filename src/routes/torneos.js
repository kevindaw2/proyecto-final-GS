const express = require('express');
const router = express.Router(); 
const mysql = require('mysql');
const db = require('../db');

router.get('/add', (req, res) => { //añadir torneo desde -> /torneos/add
    //res.send('Formulario');
    res.render('torneos/add'); 
});


module.exports = router; 