/**
* Home
*/
const express = require('express');
const router = express.Router();
const { pool } = require('../db');
const passport = require('passport');


router.get('/', async (req, res) => {
    const torneos = await pool.query('SELECT * FROM torneos LIMIT 0, 5');
    res.render('main', { layout: 'index', torneos}); //index.hbs < inside main.hbs
});

router.post('/',
    passport.authenticate('local', {
        successRedirect: '/users',
        failureRedirect: '/'
    })
);


module.exports = router;