/**
 * Arranque
 * Configuración
 * Globales
 * Middlewares
 */

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const flash = require('connect-flash');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');

const app = express();
require('./lib/passport');

//setts
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//template engine ---> tutorial https://waelyasmina.medium.com/a-guide-into-using-handlebars-with-your-express-js-application-22b944443b65
app.engine('hbs', exphbs.engine({
    defaultLayout: 'main', //main principal con css fonts, etc ... 
    layoutsDir: path.join(app.get('views'), 'layouts'), //diferentes vistas de la app
    partialsDir: path.join(app.get('views'), 'partials'), //"componentes reutilizables en las diferentes vistas"
    extname: '.hbs', //extension para las views 
    helpers: require('./lib/handlebars') //helpers para hbs 
}));

//middle
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); //public folder to css, js, images...
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'bla bla bla' 
  }));
app.use(passport.initialize());
app.use(passport.session());

//sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000, secure: false }
}));


//server
app.listen(app.get('port'), () => {
    console.log('Server listening', app.get('port'));
});

//routes
var indexRouter = require('./routes/index');
var authRouter = require('./routes/authentication');
const req = require('express/lib/request');

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/torneos', require('./routes/torneos')); // url + /torneos para gestionarlos
app.use(require('./routes/api'));