/**
* Home
*/
const express = require('express');
const router = express.Router();
const { pool } = require('../db');
const passport = require('passport');
const helpers = require('../lib/helpers');


router.get('/', async (req, res) => {
    const torneos = await pool.query('SELECT * FROM torneos');
    res.render('main', { layout: 'index', torneos}); //index.hbs < inside main.hbs
});

router.post('/',
    passport.authenticate('local', {
        successRedirect: '/users',
        failureRedirect: '/'
    })
);

router.get('/vistaTorneo', async (req, res) => {
    //res.render('main', { layout: 'vistaTorneo'}, helpers: {dateFormat()}); 
    res.render('home', { //index.hbs < inside main.hbs
        layout: 'vistaTorneo',
        helpers: {
            dateFormat() { return 'foo.'; }
        }
    });
});


module.exports = router;