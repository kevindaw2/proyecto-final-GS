const express = require('express');
const router = express.Router(); 
const { pool } = require('../db');
const path = require('path');

router.get('/add', (req, res) => { //get vista -> /torneos/add
    res.render('main', { layout: 'registroTorneo'})
});

router.post('/add', async(req, res) => { //post torneo
    
    const {nombre, descripcion, reglas, juego, fecha_comienzo, participantes} = req.body;
    const nuevoTorneo = {nombre, descripcion, reglas, juego, fecha_comienzo, participantes, id_jugador:'1'};
    await pool.query('INSERT INTO torneos set ?', [nuevoTorneo]);
    const idTorneo = await pool.query('SELECT id_torneo FROM torneos WHERE nombre = ?', [nuevoTorneo.nombre]);
    const result = Object.values(JSON.parse(JSON.stringify(idTorneo)));
    result.forEach((v) => console.log(v.id_torneo));

    res.redirect('/torneos/vistaTorneo/1' );
});

//torneo especifico por id 
router.get('/vistaTorneo/:id', async(req, res) => {
    const { id } = req.params; 
    const torneo = await pool.query('SELECT * FROM torneos where id_torneo = ?', [id]); 
    res.render('main', { layout: 'vistaTorneo', torneo}); 
});

//get editarTorneo por id 
router.get('/edit/:id', async(req, res) => {
    const {id} = req.params; 
    const torneo = await pool.query('SELECT * FROM torneos WHERE id_torneo =?', [id]);
    console.log(torneo);
    res.render('main', {layout: 'editarTorneo', torneo: torneo[0]})
}); 

//post del torneo editado
router.post('/edit/:id', async(req, res) => {
    const {id} = req.params; 
    const {nombre, numero_torneo, fecha_comienzo, descripcion, participantes, reglas} = req.body; 
    const torneoEditado = {
        nombre, 
        numero_torneo,
        fecha_comienzo, 
        descripcion, 
        participantes,
        reglas
    }; 
    await pool.query('UPDATE torneos set ? WHERE id_torneo = ?', [torneoEditado, id]);
    res.redirect('/profile');
}); 

//eliminar torneo por id 
router.get('/delete/:id', async(req, res) => {
    const {id} = req.params; 
    await pool.query('DELETE FROM torneos WHERE id_torneo =?', [id]);
    res.redirect('/profile');
}); 

module.exports = router; 