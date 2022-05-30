const express = require('express');
const router = express.Router(); 
const mysql = require('mysql');
const { pool } = require('../db');
const path = require('path');

router.get('/add', (req, res) => { //añadir torneo desde -> /torneos/add
    res.sendFile(path.join(__dirname, '../views/torneos', 'registroTorneo.html')); 
});

//torneo especifico
router.get('/detalleTorneo/:id', async(req, res) => {
    const { id } = req.params; 
    const torneo = await pool.query('SELECT * FROM torneos where id_torneo = ?', [id]); 
    res.render('main', { layout: 'detalleTorneo', torneo}); 
});

// //añadir torneo 
// router.post('/add', async (req, res) => {
//     const { nombre, equipos, numeros } = req.body; //a partir del formulario se obtienen los atributos
//     const nuevoTorneo = { //nuevo objecto con propiedades 
//         nombre,
//         equipos,
//         numeros
//     };

//     await pool.query('INSERT INTO torneos SET ?', [nuevoTorneo]);
// });


module.exports = router; 