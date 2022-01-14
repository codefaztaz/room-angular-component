'use strict'

// Requires
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');


// Ejecutar express
var app = express();

// Cargar archivos de rutas
var user_routes = require('./routes/user');
var room_routes = require('./routes/room');
var topic_routes = require('./routes/topic');
var comment_routes = require('./routes/comment');

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Middlewares deprecated
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();

});

app.use(cors());

// Reescribir rutas
app.use('/api', user_routes);
//app.use('/api', book_routes);
app.use('/admin', room_routes);
app.use('/api', topic_routes);
app.use('/api', comment_routes);

// Exportar modulo
module.exports = app;