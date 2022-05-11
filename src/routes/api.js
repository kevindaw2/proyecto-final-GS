const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all users
router.get('/api/users', async (req, res) => {
    const users = await pool.query('SELECT * FROM users');
    res.json(users);
});

// Get one user
router.get('/api/users/:username', async (req, res) => {
    const { username } = req.params;
    const user = await pool.query('SELECT * FROM users WHERE username = ?', [username])
    res.json(user);
});

// Create user
router.post('/api/users', async (req, res) => {
    try {
        // Password should be encypted before inserting user
        await pool.query('INSERT INTO users SET ?', [req.body]);
        res.json({status: 'created'});
    } catch(err) {
        console.log(err);
        res.json({status: 'error'});
    }
});

// Update user
router.put('/api/users/:username', async (req, res) => {
    try {
        const { username } = req.params;
        await pool.query('UPDATE users SET ? WHERE username = ?', [req.body, username]);
        res.json({status: 'updated'});
    } catch(err) {
        res.json({status: 'error'});
    }
});

// Delete user
router.delete('/api/users/:username', async (req, res) => {
    try {
        const { username } = req.params;
        await pool.query('DELETE FROM users WHERE username = ?', username);
        res.json({status: 'deleted'});
    } catch(err) {
        res.json({status: 'error'});
    }
});

// Get all torneos
router.get('/api/torneos', async (req, res) => {
    const torneos = await pool.query('SELECT * FROM torneos');
    res.json(torneos);
});

// Get one torneo
router.get('/api/torneos/:id', async (req, res) => {
    const { id } = req.params;
    const torneo = await pool.query('SELECT * FROM torneos WHERE id = ?', [id])
    res.json(torneo);
});

// Create torneo
router.post('/api/torneos', async (req, res) => {
    try {
        await pool.query('INSERT INTO torneos SET ?', [req.body]);
        res.json({status: 'created'});
    } catch(err) {
        console.log(err);
        res.json({status: 'error'});
    }
});

// Update torneo
router.put('/api/torneos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('UPDATE torneos SET ? WHERE id = ?', [req.body, id]);
        res.json({status: 'updated'});
    } catch(err) {
        res.json({status: 'error'});
    }
});

// Delete torneo
router.delete('/api/torneos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM torneos WHERE id = ?', id);
        res.json({status: 'deleted'});
    } catch(err) {
        res.json({status: 'error'});
    }
});

// Get torneos for specific user
router.get('/api/torneos/user/:username', async (req, res) => {
    const { username } = req.params;
    const users = await pool.query('SELECT * FROM torneos WHERE user = ?', [username]);
    res.json(users);
});

module.exports = router;