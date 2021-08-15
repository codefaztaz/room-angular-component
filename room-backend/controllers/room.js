'use strict'

var validator = require('validator');
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');

var User = require('../models/user');
var jwt = require('../services/jwt');
var Room = require('../models/room');

var controller = {

    probando: function(req, res) {
        return res.status(200).send({
            message: "Soy el metodo probando"
        });
    },

    testeando: function(req, res) {
        return res.status(200).send({
            message: "Soy el metodo TESTEANDO"
        });
    },

    save: function(req, res) {
        // Recoger los parametros de la petición
        var params = req.body;
        console.log(params);

        // Validar los datos
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_titleEs = !validator.isEmpty(params.titleEs);
            var validate_description = !validator.isEmpty(params.description);
            var validate_descriptionEs = !validator.isEmpty(params.descriptionEs);
            var validate_location = !validator.isEmpty(params.location);
            var validate_locationEs = !validator.isEmpty(params.locationEs);
            var validate_price = !validator.isEmpty(params.price);
            var validate_priceEs = !validator.isEmpty(params.priceEs);
            var validate_roomtype = !validator.isEmpty(params.roomtype);
            var validate_roomtypeEs = !validator.isEmpty(params.roomtypeEs);
            var validate_length = !validator.isEmpty(params.length);
            var validate_lengthEs = !validator.isEmpty(params.lengthEs);
            
            
          
            var validate_mapgoogle = !validator.isEmpty(params.mapgoogle);
            var validate_mapgoogleEs = !validator.isEmpty(params.mapgoogleEs);
            var validate_reference = !validator.isEmpty(params.reference);
            var validate_referenceEs = !validator.isEmpty(params.referenceEs);
            var validate_availabilityfrom = !validator.isEmpty(params.availabilityfrom);
            var validate_availabilityfromEs = !validator.isEmpty(params.availabilityfromEs);
            var validate_availablecouples = !validator.isEmpty(params.availablecouples);
            var validate_availablecouplesEs = !validator.isEmpty(params.availablecouplesEs);
            var validate_bills = !validator.isEmpty(params.bills);
            var validate_billsEs = !validator.isEmpty(params.billsEs);
            var validate_deposit = !validator.isEmpty(params.deposit);
            var validate_depositEs = !validator.isEmpty(params.depositEs);
            var validate_parking = !validator.isEmpty(params.parking);
            var validate_parkingEs = !validator.isEmpty(params.parkingEs);
        

            //console.log(validate_name, validate_surname, validate_email, validate_password);
        } catch (err) {
            return res.status(200).send({
                message: "Faltan datos por enviar de la habitacion"
            });
        } 

        if (validate_title && validate_titleEs && validate_description  && validate_descriptionEs && validate_price && validate_priceEs &&  validate_parking && validate_parkingEs
             &&  validate_roomtype &&  validate_roomtypeEs && validate_mapgoogle && validate_mapgoogleEs && validate_reference && validate_referenceEs &&  validate_availabilityfrom &&
             validate_availabilityfromEs && validate_location &&  validate_locationEs && validate_availablecouples &&  validate_availablecouplesEs &&  validate_length
              && validate_lengthEs && validate_bills && validate_billsEs && validate_deposit && validate_depositEs) {
            // Crear objeto de usuario
            var room = new Room();

            // Asignar valores al objeto
            room.title = params.title;
            room.titleEs = params.titleEs;
            room.description = params.description;
            room.descriptionEs = params.descriptionEs;
            room.location = params.location;
            room.locationEs = params.locationEs;
            room.price = params.price;
            room.priceEs = params.priceEs;
            room.roomtype = params.roomtype;
            room.roomtypeEs = params.roomtypeEs;
            room.length = params.length;
            room.lengthEs = params.lengthEs;
            room.mapgoogle = params.mapgoogle;
            room.mapgoogleEs = params.mapgoogleEs;
            room.reference = params.reference;
            room.referenceEs = params.referenceEs;
            room.availability = "false";
            room.availabilityfrom = params.availabilityfrom;
            room.availabilityfromEs = params.availabilityfromEs;
            room.availablecouples = params.availablecouples;
            room.availablecouplesEs = params.availablecouplesEs;
            room.bills = params.bills;
            room.billsEs = params.billsEs;
            room.deposit = params.deposit;
            room.depositEs = params.depositEs;
            room.parking = params.parking;
            room.parkingEs = params.parkingEs;
            room.image1 = null;
            room.image2 = null;
            room.image3 = null;
            room.image4 = null;
            room.image5 = null;



            // Comprobar si el usuario existe
            Room.findOne({ title: Room.reference }, (err, issetRoom) => {
                if (err) {
                    return res.status(500).send({
                        message: "Error al comprobar duplicidad de la habitación"
                    });
                }

                if (!issetRoom) {
                    // Si no exite,

                    //cifrar la contraseña
                    //	bcrypt.hash(params.password, null, null, (err, hash) => {
                    //		user.password = hash;

                    //y guardar usuario
                    room.save((err, roomStored) => {
                        if (err) {
                            return res.status(500).send({
                                message: "Error al guardar la habitación"
                            });
                        }

                        if (!roomStored) {
                            return res.status(400).send({
                                message: "La habitación no se ha guardado"
                            });
                        }

                        // Devolver respuesta
                        return res.status(200).send({
                            status: 'success',
                            room: roomStored
                        });

                    }); // close save


                } else {
                    return res.status(200).send({
                        message: "La habitación ya está registrada"
                    });
                }

            });


        } else {
            return res.status(200).send({
                message: "Validación de los datos de la habitación incorrecta, intentalo de nuevo"
            });
        }

    },




    saveadmin: function(req, res) {
        // Recoger los parametros de la petición
        var params = req.body;

        // Validar los datos
        try {
            var validate_name = !validator.isEmpty(params.name);
            var validate_surname = !validator.isEmpty(params.surname);
            var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
            var validate_password = !validator.isEmpty(params.password);
            //console.log(validate_name, validate_surname, validate_email, validate_password);
        } catch (err) {
            return res.status(200).send({
                message: "Faltan datos por enviar"
            });
        }

        if (validate_name && validate_surname && validate_password && validate_email) {
            // Crear objeto de usuario
            var user = new User();

            // Asignar valores al objeto
            user.name = params.name;
            user.surname = params.surname;
            user.email = params.email.toLowerCase();
            user.role = 'ROLE_ADMIN';


            // Comprobar si el usuario existe
            User.findOne({ email: user.email }, (err, issetUser) => {
                if (err) {
                    return res.status(500).send({
                        message: "Error al comprobar duplicidad de usuario"
                    });
                }

                if (!issetUser) {
                    // Si no exite,

                    //cifrar la contraseña
                    bcrypt.hash(params.password, null, null, (err, hash) => {
                        user.password = hash;

                        //y guardar usuario
                        user.save((err, userStored) => {
                            if (err) {
                                return res.status(500).send({
                                    message: "Error al guardar el usuario"
                                });
                            }

                            if (!userStored) {
                                return res.status(400).send({
                                    message: "El usuario no se ha guardado"
                                });
                            }

                            // Devolver respuesta
                            return res.status(200).send({
                                status: 'success',
                                user: userStored
                            });

                        }); // close save
                    }); // close bcrypt

                } else {
                    return res.status(200).send({
                        message: "El usuario ya está registrado"
                    });
                }

            });


        } else {
            return res.status(200).send({
                message: "Validación de los datos del usuario incorrecta, intentalo de nuevo"
            });
        }

    },

    jwt: function(req, res) {
        let privateKey = fs.readFileSync('./private.pem', 'utf8');
        let token = jwt.sign({ "body": "stuff" }, "MySuperSecretPassPhrase", { algorithm: 'HS256' });
        res.send(token);
    },


    login: function(req, res) {
        // Recoger los parametros de la petición
        var params = req.body;

        // Validar los datos
        try {
            var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
            var validate_password = !validator.isEmpty(params.password);
        } catch (err) {
            return res.status(200).send({
                message: "Faltan datos por enviar"
            });
        }

        if (!validate_email || !validate_password) {
            return res.status(200).send({
                message: "Los datos son incorrectos, envialos bien"
            });
        }

        // Buscar usuarios que coincidan con el email
        User.findOne({ email: params.email.toLowerCase() }, (err, user) => {

            if (err) {
                return res.status(500).send({
                    message: "Error al intentar identificarse"
                });
            }

            if (!user) {
                return res.status(404).send({
                    message: "El usuario no existe"
                });
            }

            // Si lo encuentra,
            // Comprobar la contraseña (coincidencia de email y password / bcrypt)
            bcrypt.compare(params.password, user.password, (err, check) => {

                if (user.role == 'ROLE_ADMIN') {
                    // Si es correcto,
                    if (check) {

                        // Generar token de jwt y devolverlo
                        if (params.gettoken) {

                            // Devolver los datos
                            return res.status(200).send({
                                token: jwt.createToken(user)
                            });

                        } else {

                            // Limpiar el objeto
                            user.password = undefined;

                            // Devolver los datos
                            return res.status(200).send({
                                status: "success",
                                user
                            });

                        }

                    } else {
                        return res.status(200).send({
                            message: "Las credenciales no son correctas"
                        });
                    }
                } else {
                    return res.status(404).send({
                        message: "El usuario no es administrador"
                    });
                }
            });

        });
    },
    loginuser: function(req, res) {
        // Recoger los parametros de la petición
        var params = req.body;

        // Validar los datos
        try {
            var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
            var validate_password = !validator.isEmpty(params.password);
        } catch (err) {
            return res.status(200).send({
                message: "Faltan datos por enviar"
            });
        }

        if (!validate_email || !validate_password) {
            return res.status(200).send({
                message: "Los datos son incorrectos, envialos bien"
            });
        }

        // Buscar usuarios que coincidan con el email
        User.findOne({ email: params.email.toLowerCase() }, (err, user) => {

            if (err) {
                return res.status(500).send({
                    message: "Error al intentar identificarse"
                });
            }

            if (!user) {
                return res.status(404).send({
                    message: "El usuario no existe"
                });
            }

            // Si lo encuentra,
            // Comprobar la contraseña (coincidencia de email y password / bcrypt)
            bcrypt.compare(params.password, user.password, (err, check) => {


                // Si es correcto,
                if (check) {

                    // Generar token de jwt y devolverlo
                    if (params.gettoken) {

                        // Devolver los datos
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        });

                    } else {

                        // Limpiar el objeto
                        user.password = undefined;

                        // Devolver los datos
                        return res.status(200).send({
                            status: "success",
                            user
                        });

                    }

                } else {
                    return res.status(200).send({
                        message: "Las credenciales no son correctas"
                    });
                }

            });

        });
    },

    update: function(req, res) {
        // Recoger datos del usuario
        var params = req.body;
        console.log('params', params);
        var roomId = req.body._id;
        console.log('id', roomId);
        // Buscar y actualizar documento
        Room.findOneAndUpdate({ _id: roomId }, params, { new: true }, (err, roomUpdated) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al actualizar la habitación'
                });
            }

            if (!roomUpdated) {
                return res.status(200).send({
                    status: 'error',
                    message: 'No se a actualizado la habitacion'
                });
            }

            // Devolver respuesta
            return res.status(200).send({
                status: 'success',
                user: roomUpdated
            });

        });


    },

    updateImage1: function(req, res) {
        var image = req.body;
        console.log(image);
        var image1 = req.body.image1;
        var image2 = req.body.image2;
        var image3 = req.body.image3;
        var image4 = req.body.image4;
        var image5 = req.body.image5;
        console.log('image2', image2);
        var roomId = req.body.id;

        console.log('idddd', roomId);
        if (image1) {
            Room.findOneAndUpdate({ _id: roomId }, {
                    $unset: { image1: null }
                }, { new: true },
                (err, roomUpdated) => {

                    if (err) {
                        return res.status(500).send({
                            status: 'error',
                            message: 'Error al actualizar la habitación'
                        });
                    }

                    if (!roomUpdated) {
                        return res.status(200).send({
                            status: 'error',
                            message: 'No se a actualizado la habitacion'
                        });
                    }

                    // Devolver respuesta
                    return res.status(200).send({
                        status: 'success',
                        room: roomUpdated
                    });

                });
        }
        if (image2) {
            Room.findOneAndUpdate({ _id: roomId }, {
                    $unset: { image2: null }
                }, { new: true },
                (err, roomUpdated) => {

                    if (err) {
                        return res.status(500).send({
                            status: 'error',
                            message: 'Error al actualizar la habitación'
                        });
                    }

                    if (!roomUpdated) {
                        return res.status(200).send({
                            status: 'error',
                            message: 'No se a actualizado la habitacion'
                        });
                    }

                    // Devolver respuesta
                    return res.status(200).send({
                        status: 'success',
                        room: roomUpdated
                    });

                });
        }
        if (image3) {
            Room.findOneAndUpdate({ _id: roomId }, {
                    $unset: { image3: null }
                }, { new: true },
                (err, roomUpdated) => {

                    if (err) {
                        return res.status(500).send({
                            status: 'error',
                            message: 'Error al actualizar la habitación'
                        });
                    }

                    if (!roomUpdated) {
                        return res.status(200).send({
                            status: 'error',
                            message: 'No se a actualizado la habitacion'
                        });
                    }

                    // Devolver respuesta
                    return res.status(200).send({
                        status: 'success',
                        room: roomUpdated
                    });

                });
        }
        if (image4) {
            Room.findOneAndUpdate({ _id: roomId }, {
                    $unset: { image4: null }
                }, { new: true },
                (err, roomUpdated) => {

                    if (err) {
                        return res.status(500).send({
                            status: 'error',
                            message: 'Error al actualizar la habitación'
                        });
                    }

                    if (!roomUpdated) {
                        return res.status(200).send({
                            status: 'error',
                            message: 'No se a actualizado la habitacion'
                        });
                    }

                    // Devolver respuesta
                    return res.status(200).send({
                        status: 'success',
                        room: roomUpdated
                    });

                });
        }
        if (image5) {
            Room.findOneAndUpdate({ _id: roomId }, {
                    $unset: { image5: null }
                }, { new: true },
                (err, roomUpdated) => {

                    if (err) {
                        return res.status(500).send({
                            status: 'error',
                            message: 'Error al actualizar la habitación'
                        });
                    }

                    if (!roomUpdated) {
                        return res.status(200).send({
                            status: 'error',
                            message: 'No se a actualizado la habitacion'
                        });
                    }

                    // Devolver respuesta
                    return res.status(200).send({
                        status: 'success',
                        room: roomUpdated
                    });

                });
        }

    },


    saveImg: function(req, res) {
        console.log("saveimage ejecutandose");
        var roomId = req.body.id;
        console.log('id', roomId);
        var file_name = req.body.image1;
        var file_name2 = req.body.image2;
        var file_name3 = req.body.image3;
        var file_name4 = req.body.image4;
        var file_name5 = req.body.image5;
        console.log('file2', file_name2);
        console.log('file', file_name);



        console.log('file_name', file_name);
        console.log('file_name2', file_name2);

        if (file_name) {
            Room.findOneAndUpdate({ _id: roomId }, { image1: file_name }, { new: true }, (err, roomUpdate) => {
                if (err || !roomUpdate) {
                    // Devolver respuesta
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al guardar la habitación'
                    });
                }
            });
            // Devolver respuesta
            return res.status(200).send({
                status: 'success',
                image1: file_name,


            });
        } else if (file_name2) {
            Room.findOneAndUpdate({ _id: roomId }, { image2: file_name2 }, { new: true }, (err, roomUpdate) => {
                if (err || !roomUpdate) {
                    // Devolver respuesta
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al guardar la habitación'
                    });
                }
            });
            // Devolver respuesta
            return res.status(200).send({
                status: 'success',
                image2: file_name2,


            });
        } else if (file_name3) {
            Room.findOneAndUpdate({ _id: roomId }, { image3: file_name3 }, { new: true }, (err, roomUpdate) => {
                if (err || !roomUpdate) {
                    // Devolver respuesta
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al guardar la habitación'
                    });
                }
            });
            // Devolver respuesta
            return res.status(200).send({
                status: 'success',
                image3: file_name3,


            });
        } else if (file_name4) {
            Room.findOneAndUpdate({ _id: roomId }, { image4: file_name4 }, { new: true }, (err, roomUpdate) => {
                if (err || !roomUpdate) {
                    // Devolver respuesta
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al guardar la habitación'
                    });
                }
            });
            // Devolver respuesta
            return res.status(200).send({
                status: 'success',
                image4: file_name4,


            });
        } else if (file_name5) {
            Room.findOneAndUpdate({ _id: roomId }, { image5: file_name5 }, { new: true }, (err, roomUpdate) => {
                if (err || !roomUpdate) {
                    // Devolver respuesta
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al guardar la habitación'
                    });
                }
            });
            // Devolver respuesta
            return res.status(200).send({
                status: 'success',
                image5: file_name5,


            });
        }






    },

    uploadAvatar: function(req, res) {
        // Configurar el modulo multiparty (md) routes/user.js
        // var fileName = req.params.fileName;
        // var file = fileName.replace(/['"]+/g, '');
        // console.log('file', file);
        // var path = './uploads/rooms/' + file;
        // fs.unlink(path, (err) => {
        //     if (err) {
        //         console.error(err)
        //         return
        //     }

        //     //file removed
        // })



        // Recoger el fichero de la petición
        var file_name = 'imagen no subida...';


        if (!req.files) {
            return res.status(404).send({
                status: 'error',
                message: file_name
            });
        }

        // Conseguir el nombre y la extension del archivo
        // var file = req.params.file0.path;
        var file = req.files.file0.path;

        var identifier = req.params.image;
        console.log('identifier', identifier);



        console.log(file);
        // var path = file
        // var file_split = file_path.split('\\');

        // ** Adventencia ** En linux o mac
        var file_split = file.split('/');

        // Nombre del archivo
        var file_name = file_split[2];
        console.log(file_name);

        // Extensión del archivo
        var ext_split = file_name.split('\.');
        console.log(ext_split);
        var file_ext = ext_split[1];
        console.log(file_ext);


        // Comprobar extension (solo imagenes), si no es valida borrar fichero subido
        if (file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif') {
            fs.unlink(file, (err) => {

                return res.status(400).send({
                    status: 'error',
                    message: 'La extensión del archivo no es valida.'
                });

            });

        } else {

            var afuimage = req.query.image;
            console.log('afu', afuimage);
            if (afuimage == 1) {
                return res.status(200).send({
                    status: 'success',
                    image1: file_name,
                });
            } else if (afuimage == 2) {
                return res.status(200).send({
                    status: 'success',
                    image2: file_name,
                });
            } else if (afuimage == 3) {
                return res.status(200).send({
                    status: 'success',
                    image3: file_name,
                });
            } else if (afuimage == 4) {
                return res.status(200).send({
                    status: 'success',
                    image4: file_name,
                });
            } else if (afuimage == 5) {
                return res.status(200).send({
                    status: 'success',
                    image5: file_name,
                });
            }




        }

    },

    delete: function(req, res) {

        // Sacar el id del topic de la url
        var roomId = req.params.roomid;
        console.log('roomdelete', roomId);

        // Find and delete por topicID y por userID 
        Room.findOneAndDelete({ _id: roomId }, (err, roomRemoved) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error en la petición'
                });
            }

            if (!roomRemoved) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado la habitación'
                });
            }

            // Devolver respuesta
            return res.status(200).send({
                status: 'success',
                room: roomRemoved
            });
        });
    },


    avatar: function(req, res) {
        var fileName = req.params.fileName;
        console.log('filename', fileName);
        var pathFile = './uploads/rooms/' + fileName;

        fs.exists(pathFile, (exists) => {
            if (exists) {
                return res.sendFile(path.resolve(pathFile));
            } else {
                return res.status(404).send({
                    message: 'La imagen no existe'
                });
            }
        });
    },

    // avatar2: function(req, res) {
    //     var fileName = req.params.image2;
    //     var pathFile = './uploads/rooms/' + fileName;

    //     fs.exists(pathFile, (exists) => {
    //         if (exists) {
    //             return res.sendFile(path.resolve(pathFile));
    //         } else {
    //             return res.status(404).send({
    //                 message: 'La imagen no existe'
    //             });
    //         }
    //     });
    // },

    deleteAvatar: function(req, res) {
        var fileName = req.params.fileName;
        var file = fileName.replace(/['"]+/g, '');
        console.log('file', file);
        var pathFile = './uploads/rooms/' + file;
        console.log(pathFile);
        // fs.stat(pathFile, function(err, stats) {
        //     console.log(stats); //here we got all information of file in stats variable

        //     if (err) {
        //         return console.error(err);
        //     }

        fs.unlink(pathFile, function(err) {
            if (err) return console.log(err);
            console.log('file deleted successfully');
        });
        //  });

    },

    getRooms: function(req, res) {

        // Recoger la pagina actual
        if (!req.params.page || req.params.page == 0 || req.params.page == "0" || req.params.page == null || req.params.page == undefined) {
            var page = 1;
        } else {
            var page = parseInt(req.params.page);
        }

        // Indicar las opciones de paginacion
        var options = {
            sort: { date: -1 },
            populate: 'room',
            limit: 5,
            page: page,
            read: {
                tags: [{
                        availability: 'true'
                    }

                ],
            }
        };

        // Find paginado
        Room.paginate({ availability: true }, options, (err, rooms) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al hacer la consulta'
                });
            }

            if (!rooms) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay libros'
                });
            }


            // Devoler resultado (topics, total de topic, total de paginas)
            return res.status(200).send({
                status: 'success',
                rooms: rooms.docs,
                totalDocs: rooms.totalDocs,
                totalPages: rooms.totalPages
            });

        });

    },

    getRoomsEs: function(req, res) {

        // Recoger la pagina actual
        if (!req.params.page || req.params.page == 0 || req.params.page == "0" || req.params.page == null || req.params.page == undefined) {
            var page = 1;
        } else {
            var page = parseInt(req.params.page);
        }

        // Indicar las opciones de paginacion
        var options = {
            sort: { date: -1 },
            populate: 'room',
            limit: 5,
            page: page,
            read: {
                tags: [{
                        availability: 'true'
                    }

                ],
            }
        };

        // Find paginado
        Room.paginate({ availability: true }, options, (err, rooms) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al hacer la consulta'
                });
            }

            if (!rooms) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay libros'
                });
            }


            // Devoler resultado (topics, total de topic, total de paginas)
            return res.status(200).send({
                status: 'success',
                rooms: rooms.docs,
                totalDocs: rooms.totalDocs,
                totalPages: rooms.totalPages
            });

        });

    },
    getRoomsFull: function(req, res) {

        // Recoger la pagina actual
        if (!req.params.page || req.params.page == 0 || req.params.page == "0" || req.params.page == null || req.params.page == undefined) {
            var page = 1;
        } else {
            var page = parseInt(req.params.page);
        }

        // Indicar las opciones de paginacion
        var options = {
            sort: { date: -1 },
            populate: 'room',
            limit: 5,
            page: page,
            read: {
                tags: [{
                        availability: 'false'
                    }

                ],
            }
        };

        // Find paginado
        Room.paginate({ availability: false }, options, (err, rooms) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al hacer la consulta'
                });
            }

            if (!rooms) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay libros'
                });
            }


            // Devoler resultado (topics, total de topic, total de paginas)
            return res.status(200).send({
                status: 'success',
                rooms: rooms.docs,
                totalDocs: rooms.totalDocs,
                totalPages: rooms.totalPages
            });

        });

    },

    getRoom: function(req, res) {
        var roomId = req.params.roomId;
        console.log(roomId);
        var availability = true;
        var language = 'spanish';
        console.log(language);
        Room.findById(roomId).exec((err, room) => {
            // Room.find({ availability: true }).exec((err, room) => {
            if (err || !room) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe la habitacion'
                });
            }

            return res.status(200).send({
                status: 'success',
                room
            });
        });
    },
    // getRoom: function(req, res) {
    //     var roomId = req.params.roomId;
    //     var availability = true;
    //     var language = 'english';
    //     Room.findById(roomId).exec((err, room) => {
    //         // Room.find({ availability: true }).exec((err, room) => {
    //         if (err || !room) {
    //             return res.status(404).send({
    //                 status: 'error',
    //                 message: 'No existe la habitacion'
    //             });
    //         }

    //         return res.status(200).send({
    //             status: 'success',
    //             room
    //         });
    //     });
    // },
    search: function(req, res) {

        // Sacar string a buscar de la url
        var searchString = req.params.search;

        // Find or
        Book.find({
                "$or": [
                    { "title": { "$regex": searchString, "$options": "i" } },
                    { "author": { "$regex": searchString, "$options": "i" } }

                ]
            })
            .populate('book')
            .sort([
                ['date', 'descending']
            ])
            .exec((err, books) => {

                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error en la petición'
                    });
                }

                if (!books) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No hay temas disponibles'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    books
                });

            });
    }

};

module.exports = controller;