'use strict'

var express = require('express');

var RoomController = require('../controllers/room');

var router = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/rooms' });



// Rutas de usuarios
router.post('/save', RoomController.save);
router.put('/update', RoomController.update);
router.post('/saveimg', RoomController.saveImg);
//router.post('/saveimg/:id/:image1/', RoomController.saveImg);
router.post('/upload-avatar', md_upload, RoomController.uploadAvatar);
// //router.post('/upload-avatar', [md_auth.authenticated, md_upload], AdminController.uploadAvatar);
router.get('/avatar/:fileName', RoomController.avatar);
router.get('/avatar2/:image2', RoomController.avatar2);
// router.delete('/book/:id', md_auth.authenticated, AdminController.delete);
router.delete('/delete-avatar/:fileName', RoomController.deleteAvatar);
router.get('/rooms/:page', RoomController.getRooms);
router.get('/roomsfull/:page', RoomController.getRoomsFull);
// //router.get('/books/', AdminController.getBooks);
router.get('/room/:roomId', RoomController.getRoom);
// router.get('/search/:search', AdminController.search);


module.exports = router;