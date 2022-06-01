const express = require('express');
const router = express.Router(); 
const { pool } = require('../db');
const path = require('path');

router.get('/add', (req, res) => { //get vista -> /torneos/add
    res.render('main', { layout: 'registroTorneo'})
});

router.post('/add', async(req, res) => { //post torneo
    console.log(req.body);
    const {nombre, descripcion, reglas, juego, fecha_comienzo, participantes} = req.body;
    const {id_jugador} = req.user.id_usuario;
    const nuevoTorneo = {nombre, descripcion, reglas, juego, fecha_comienzo, participantes, id_jugador};

    await pool.query('INSERT INTO torneos set ?', [nuevoTorneo]);

    res.redirect('/profile');
});

//torneo especifico
router.get('/vistaTorneo/:id', async(req, res) => {
    const { id } = req.params; 
    const torneo = await pool.query('SELECT * FROM torneos where id_torneo = ?', [id]); 
    res.render('main', { layout: 'vistaTorneo', torneo}); 
}); 

router.get('/yours', async(req, res) => { //  -> /torneos
    const {id} = req.user.id_usuario; 
    const torneos = await pool.query('SELECT * FROM torneos where id_jugador = ?', [id]);
    res.render('main', { layout: 'profile', torneos}); //index.hbs < inside main.hbs
});


module.exports = router; 