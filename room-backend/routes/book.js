'use strict'

var express = require('express');

var AdminController = require('../controllers/admin');

var router = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/books' });

// Rutas de prueba
//router.get('/probando', UserController.probando);
router.post('/testeando', AdminController.testeando);

// Rutas de usuarios
router.post('/save', AdminController.save);
router.post('/saveadmin', AdminController.saveadmin);
router.post('/login', AdminController.login);
router.post('/loginuser', AdminController.loginuser);
//router.put('/update/:bookId', AdminController.update);
router.put('/update', AdminController.update);
//router.post('/upload-avatar', md_upload, AdminController.uploadAvatar);
router.put('/upload-avatar', [md_auth.authenticated, md_upload], AdminController.uploadAvatar);
//router.post('/upload-avatar', [md_auth.authenticated, md_upload], AdminController.uploadAvatar);
router.get('/avatar/:fileName', AdminController.avatar);
router.delete('/book/:id', md_auth.authenticated, AdminController.delete);
router.delete('/delete-avatar/:fileName', AdminController.deleteAvatar);
router.get('/books/:page', AdminController.getBooks);
//router.get('/books/', AdminController.getBooks);
router.get('/book/:bookId', AdminController.getBook);
router.get('/search/:search', AdminController.search);


router.get('/jwt', AdminController.jwt);
module.exports = router;