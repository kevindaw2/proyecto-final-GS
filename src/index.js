/**
 * Arranque
 * Configuración
 * Globales
 * Middlewares
 */

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express(); 

//setts
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

//template engine
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main', //main principal con css fonts, etc ... 
    layoutsDir: path.join(app.get('views'), 'layouts'), //diferentes vistas de la app
    partialsDir: path.join(app.get('views'), 'partials'), //"componentes reutilizables en las diferentes vistas"
    extname: '.hbs', //extension para las views 
    helpers: require('./lib/handlebars') //helpers para hbs 
}));
app.set('view engine', '.hbs');

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
