/**
* Home
*/
const express = require('express');
const router = express.Router(); 
const path = require('path');
const mysql = require('mysql');
const db = require('../db');

router.get('/', async(req, res) => {
    const torneos = await db.query('SELECT * FROM torneos'); 
    res.render('views/index', {torneos}); 
    //res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

module.exports = router; 