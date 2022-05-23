//manejo de la bbdd
const express = require('express');
const app = express(); 
const mysql = require('mysql');
const dotenv = require('dotenv');
const { promisify } = require('util');
dotenv.config();


var database = { //session store
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE 
}

 // Crear grupo de datos
 const pool  = mysql.createPool({
    host: process.env.DBHOST, // dirección de la base de datos
    user: process.env.DBUSER, // usuario de la base de datos
    password: process.env.PASSWORD, // contraseña de la base de datos
    database: process.env.DATABASE // seleccionar base de datos
}); 

// Realizar operaciones de sesión en el grupo de datos
pool.getConnection( function(error, connection) { 
    if(error) {
        console.log(error);
    } 
    if(connection) {
        connection.release() //finaliza la sesion
        console.log('Connection OK');
        return;
    }
});

app.listen(3000, () => {
    console.log('DB listening 3000');
});

//callbacks -> promises
pool.query = promisify(pool.query); 

module.exports = {
    pool, 
    database
}; 

/**
 * Exportación de la BBDD desde cmd xampp\mysql\bin
 * mysqldump -h localhost -u root torneos>D:\Projects\Web\M12\src\database\torneos.sql
 */