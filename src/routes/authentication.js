/**
 * rutas
 * authenticación de usuarios
 */

const express = require('express');
const router = express.Router(); 

router.get('/signup', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/signup.html'));
});

router.post('/signup', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/signup.html'));
});

module.exports = router;