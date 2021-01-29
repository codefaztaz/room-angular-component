'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    address: String,
    role: String
});

CustomerSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;

    return obj;
}

module.exports = mongoose.model('Customer', UserSchema);
// lowercase y pluralizar el nombre
// users  -> documentos(schema)