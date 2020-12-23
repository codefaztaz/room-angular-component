'use strict'

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
var Schema = mongoose.Schema;

var RoomSchema = Schema({
    title: String,
    description: String,
    language: String,
    roomtype: String,
    mapgoogle: String,
    availability: String,
    price: Number,
    reference: String,
    location: String,
    image1: String,
    image2: String,
    image3: String,
    image4: String,
    image5: String,
    date: { type: Date, default: Date.now },
    user: { type: Schema.ObjectId, ref: 'User' }
});

// UserSchema.methods.toJSON = function(){
// 	var obj = this.toObject();
// 	delete obj.password;
//
// 	return obj;
// }
RoomSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Room', RoomSchema);
// lowercase y pluralizar el nombre
// users  -> documentos(schema)