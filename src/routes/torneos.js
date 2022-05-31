const express = require('express');
const router = express.Router(); 
const mysql = require('mysql');
const { pool } = require('../db');
const path = require('path');
const  isLoggedIn  = require('../routes/authentication');

router.get('/add', (req, res) => { //get vista -> /torneos/add
    res.sendFile(path.join(__dirname, '../views/torneos', 'registroTorneo.html')); 
});

router.post('/add', async(req, res) => { //post torneo
    console.log(req.body);
    const {nombre, descripcion, reglas, juego, fecha_comienzo, participantes} = req.body;
    const nuevoTorneo = {nombre, descripcion, reglas, juego, fecha_comienzo, participantes};

    await pool.query('INSERT INTO torneos set ?', [nuevoTorneo]);

    res.send('Recivided');
});

//torneo especifico
router.get('/detalleTorneo/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params; 
    const torneo = await pool.query('SELECT * FROM torneos where id_torneo = ?', [id]); 
    res.render('main', { layout: 'detalleTorneo', torneo}); 
});

router.get('/yours', async(req, res) => { //  -> /torneos
    const torneos = await pool.query('SELECT * FROM torneos where id_jugador = ?', [id]);
    res.render('main', { layout: 'index', torneos}); //index.hbs < inside main.hbs
});


module.exports = router; 