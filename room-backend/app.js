'use strict'

// Requires
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');


// Ejecutar express
var app = express();

// Middlewares

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// Cargar archivos de rutas
var user_routes = require('./routes/user');
var room_routes = require('./routes/room');
var topic_routes = require('./routes/topic');
var comment_routes = require('./routes/comment');
//const fileupload = require("express-fileupload");


//app.use(fileupload());

//Middlewares deprecated
//  app.use(bodyParser.urlencoded({ extended: false }));
//  //app.use(bodyParser.json());
//  app.use(bodyParser.json({ type: 'application/*+json' }));

// const busboy = require('connect-busboy');
// app.use(busboy());

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
