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

    res.redirect('/torneos/vistaTorneo/' + result[0].id_torneo);
});

//torneo especifico por id 
router.get('/vistaTorneo/:id', async(req, res) => {
    const { id } = req.params; 
    const torneo = await pool.query('SELECT * FROM torneos where id_torneo = ?', [id]);
    const regUsers = await pool.query('SELECT * FROM usuarios JOIN usuarios_torneo ON usuarios_torneo.id_usuario = usuarios.id_usuario WHERE usuarios_torneo.id_torneo = ?;', [id]);
    const datos = {};
    datos.torneo = torneo;
    datos.regUsers = regUsers;
    let isReg = false;
    if (req.user) {
        const isRegQ = await pool.query('SELECT * FROM usuarios_torneo WHERE usuarios_torneo.id_torneo = '+id+' AND usuarios_torneo.id_usuario = '+req.user.id_usuario+';');
        if (isRegQ.length) {
            isReg = true;
        }
    }   
    res.render('main', { layout: 'vistaTorneo', datos, isReg}); 
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

router.post('/vistaTorneo/registrarUser/:id', async(req, res) => {
    
    const newRow = {};
    newRow.id_torneo = req.params.id;
    newRow.id_usuario = req.user.id_usuario;

    await pool.query('INSERT INTO usuarios_torneo set ?', [newRow]);

    res.redirect('/torneos/vistaTorneo/' + req.params.id);

}); 

module.exports = router; 