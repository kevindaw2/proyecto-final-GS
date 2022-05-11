/**
 * Arranque
 * Configuración
 * Globales
 * Middlewares
 */

const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express(); 

//setts
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

//middle
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//global 

//server
app.listen(app.get('port'), () => {
    console.log('Server listening', app.get('port'));
});
 
//routes
app.use(require('./routes')); 
app.use(require('./routes/authentication')); 
app.use('/torneos', require('./routes/torneos')); // url + /torneos para gestionarlos
app.use(require('./routes/api'));
