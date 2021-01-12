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

        // Validar los datos
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_description = !validator.isEmpty(params.description);
            var validate_language = !validator.isEmpty(params.language);
            var validate_location = !validator.isEmpty(params.location);
            var validate_price = !validator.isEmpty(params.price);
            var validate_roomtype = !validator.isEmpty(params.roomtype);
            var validate_mapgoogle = !validator.isEmpty(params.mapgoogle);
            var validate_reference = !validator.isEmpty(params.reference);

            //console.log(validate_name, validate_surname, validate_email, validate_password);
        } catch (err) {
            return res.status(200).send({
                message: "Faltan datos por enviar de la habitacion"
            });
        }

        if (validate_title && validate_description && validate_language && validate_price && validate_roomtype && validate_mapgoogle && validate_reference && validate_location) {
            // Crear objeto de usuario
            var room = new Room();

            // Asignar valores al objeto
            room.title = params.title;
            room.description = params.description;
            room.language = params.language;
            room.location = params.location;
            room.price = params.price;
            room.roomtype = params.roomtype;
            room.mapgoogle = params.mapgoogle;
            room.reference = params.reference;
            room.availability = "false";
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


        // Validar datos
        // try {
        //     var validate_title = !validator.isEmpty(params.title);
        //     var validate_description = !validator.isEmpty(params.description);
        //     var validate_author = !validator.isEmpty(params.author);
        //     var validate_price = !validator.isEmpty(params.price);
        //     var validate_stock = !validator.isEmpty(params.stock);
        // } catch (err) {
        //     return res.status(200).send({
        //         message: "Faltan datos por enviar"
        //     });
        // }

        // Eliminar propiedades innecesarias
        //delete params.password;

        //var bookId = req.book.sub;

        //console.log(userId)

        // Comprobar si el email es unico
        // if(req.user.email != params.email){
        //
        // 	User.findOne({email: params.email.toLowerCase()}, (err, user) => {
        //
        // 		if(err){
        // 			return res.status(500).send({
        // 				message: "Error al intentar identificarse"
        // 			});
        // 		}
        //
        // 		if(user && user.email == params.email){
        // 			return res.status(200).send({
        // 				message: "El email no puede ser modificado"
        // 			});
        // 		}else{
        // 			// Buscar y actualizar documento
        // 			Book.findOneAndUpdate({_id: userId}, params, {new:true}, (err, bookUpdated) => {
        //
        // 				if(err){
        // 					return res.status(500).send({
        // 						status: 'error',
        // 						message: 'Error al actualizar libro'
        // 					});
        // 				}
        //
        // 				if(!userUpdated){
        // 					return res.status(200).send({
        // 						status: 'error',
        // 						message: 'No se a actualizado el libro'
        // 					});
        // 				}
        //
        // 				// Devolver respuesta
        // 				return res.status(200).send({
        // 						status: 'success',
        // 						user: bookUpdated
        // 					});
        //
        // 			});
        // 		}
        //
        // 	});
        //
        // }else{
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
        //	}

    },


    // uploadAvatar: function(req, res) {
    //     // Configurar el modulo multiparty (md) routes/user.js

    //     // Recoger el fichero de la petición
    //     var file_name = 'imagen no subida...';


    //     if (!req.files) {
    //         return res.status(404).send({
    //             status: 'error',
    //             message: file_name
    //         });
    //     }

    //     // Conseguir el nombre y la extension del archivo
    //     // var file_path = req.params.file0.path;
    //     var file = req.files.file0.path;


    //     console.log(file);
    //     // var path = file
    //     // var file_split = file_path.split('\\');

    //     // ** Adventencia ** En linux o mac
    //     var file_split = file.split('/');

    //     // Nombre del archivo
    //     var file_name = file_split[2];
    //     console.log(file_name);

    //     // Extensión del archivo
    //     var ext_split = file_name.split('\.');
    //     console.log(ext_split);
    //     var file_ext = ext_split[1];
    //     console.log(file_ext);


    //     // Comprobar extension (solo imagenes), si no es valida borrar fichero subido
    //     if (file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif') {
    //         fs.unlink(file, (err) => {

    //             return res.status(200).send({
    //                 status: 'error',
    //                 message: 'La extensión del archivo no es valida.'
    //             });

    //         });

    //     } else {
    //         // Sacar el id del libro
    //         var params = req.files.file0.id;
    //         console.log(file_name);
    //         var bookId = req.params.bookId;
    //         console.log('bookid', bookId);


    //         // Devolver respuesta
    //         return res.status(200).send({
    //             status: 'success',
    //             image: file_name,

    //         });

    //         console.log(image);
    //     }

    // },
    saveImg: function(req, res) {
        console.log("saveimage ejecutandose");
        var roomId = req.body.id;
        console.log('id', roomId);
        var file_name = req.body.image1;
        console.log('idroom', roomId);

        console.log('file_name', file_name);

        Room.findOneAndUpdate({ _id: roomId }, { image1: file_name }, { new: true }, (err, roomUpdate) => {
            if (err || !roomUpdate) {
                // Devolver respuesta
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al guardar la habitación'
                });
            }
        });
        //var bookId = req.params.bookId;
        //console.log('bookid', bookId);


        // Devolver respuesta
        return res.status(200).send({
            status: 'success',
            image1: file_name,

        });


    },
    uploadAvatar: function(req, res) {
        // Configurar el modulo multiparty (md) routes/user.js

        // Recoger datos del usuario
        var params = req.room;
        console.log('params', params);

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
            // //  Sacar el id del libro
            // // var roomId = req.params.id;
            // //var roomId = '5fcd1ecbced26017c19cbe34';
            // var roomId = req.params._id;
            // console.log('idroom', roomId);

            // Room.findOneAndUpdate({ _id: roomId }, { image1: file_name }, { new: true }, (err, roomUpdate) => {
            //     if (err || !roomUpdate) {
            //         // Devolver respuesta
            //         return res.status(500).send({
            //             status: 'error',
            //             message: 'Error al guardar la habitación'
            //         });
            //     }
            // });
            //var bookId = req.params.bookId;
            //console.log('bookid', bookId);


            // Devolver respuesta
            return res.status(200).send({
                status: 'success',
                image1: file_name,

            });
        }

    },
    delete: function(req, res) {

        // Sacar el id del topic de la url
        var bookId = req.params.id;
        console.log(bookId);

        // Find and delete por topicID y por userID 
        Book.findOneAndDelete({ _id: bookId }, (err, bookRemoved) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error en la petición'
                });
            }

            if (!bookRemoved) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado el tema'
                });
            }

            // Devolver respuesta
            return res.status(200).send({
                status: 'success',
                topic: bookRemoved
            });
        });
    },


    avatar: function(req, res) {
        var fileName = req.params.fileName;
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

    deleteAvatar: function(req, res) {
        var fileName = req.params.fileName;
        console.log('file', fileName);
        var pathFile = './uploads/rooms/' + fileName;
        fs.stat(pathFile, function(err, stats) {
            console.log(stats); //here we got all information of file in stats variable

            if (err) {
                return console.error(err);
            }

            fs.unlink(pathFile, function(err) {
                if (err) return console.log(err);
                console.log('file deleted successfully');
            });
        });

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
            page: page
        };

        // Find paginado
        Room.paginate({}, options, (err, rooms) => {

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

        Room.findById(roomId).exec((err, room) => {
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