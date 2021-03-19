'use strict'

// const jwt = require('jsonwebtoken');
// const fs = require('fs');
var jwt = require('jwt-simple');
var moment = require('moment');
//var secret = 'MIIEpAIBAAKCAQEAATZV5SUVri5XnRb5qYQSyoB8sGdfR4SQ9q1XPRIpBP8RYXCP';

var secret = 'clave-secreta-para-generar-el-token-9999';


exports.authenticated = function(req, res, next) {

    // Comprobar si llega autorización
    if (!req.headers.authorization) {
        return res.status(403).send({
            message: 'La petición no tiene la cabecera de authorization'
        });
    }

    // Limpiar el token y quitar comillas
    var token = req.headers.authorization.replace(/['"]+/g, '');


    // console.log(token);
    // console.log(secret);
    // var payload = jwt.decode(token, base64);
    // console.log('payload', payload);


    try {
        // Decodificar token
        var payload = jwt.decode(token, secret, false, 'HS256');
        console.log(payload);
        // Adjuntar usuario identificado a request
        // req.user = payload;

        // Pasar a la acción
        //   next();

        // Comprobar si el token ha expirado
        if (payload.exp <= moment(1 * 1).unix()) {
            return res.status(404).send({
                message: 'El token ha expirado'
            });
        }

    } catch (ex) {
        return res.status(404).send({
            message: 'El token no es válido'
        });
    }

    // Adjuntar usuario identificado a request
    req.useradmin = payload;

    // Pasar a la acción
    next();

};





// exports.authenticated = function(req, res, next) {

//     if (typeof req.headers.authorization !== "undefined") {
//         // retrieve the authorization header and parse out the
//         // JWT using the split function
//         let token = req.headers.authorization.split(" ")[1];
//         console.log(token);
//         let privateKey = fs.readFileSync('./private.pem', 'utf8');
//         console.log(privateKey);
//         // Here we validate that the JSON Web Token is valid and has been 
//         // created using the same private pass phrase
//         console.log(token);
//         jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
//             console.log(jwt);
//             // if there has been an error...
//             if (err) {
//                 // shut them out!
//                 res.status(500).json({ error: "Not Authorized" });
//                 throw new Error("Not Authorized");
//             }
//             // if the JWT is valid, allow them to hit
//             // the intended endpoint
//             return next();
//         });
//     } else {
//         // No authorization header exists on the incoming
//         // request, return not authorized and throw a new error 
//         res.status(500).json({ error: "Not Authorized" });
//         throw new Error("Not Authorized");
//     }

// };

// function isAuthenticated(req, res, next) {
//     if (typeof req.headers.authorization !== "undefined") {
//         // retrieve the authorization header and parse out the
//         // JWT using the split function
//         let token = req.headers.authorization.split(" ")[1];
//         let privateKey = fs.readFileSync('./private.pem', 'utf8');
//         // Here we validate that the JSON Web Token is valid and has been 
//         // created using the same private pass phrase
//         jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {

//             // if there has been an error...
//             if (err) {
//                 // shut them out!
//                 res.status(500).json({ error: "Not Authorized" });
//                 throw new Error("Not Authorized");
//             }
//             // if the JWT is valid, allow them to hit
//             // the intended endpoint
//             return next();
//         });
//     } else {
//         // No authorization header exists on the incoming
//         // request, return not authorized and throw a new error 
//         res.status(500).json({ error: "Not Authorized" });
//         throw new Error("Not Authorized");
//     }
// }