'use strict'

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
var Schema = mongoose.Schema;

var RoomSchema = Schema({
    title: String,
    titleEs: String,
    description: String,
    descriptionEs:String,
    availablecouples: String,
    availablecouplesEs: String,
    roomtype: String,
    roomtypeEs:String,
    mapgoogle: String,
    mapgoogleEs:String,
    availability: String,
    availabilityfrom: String,
    availabilityfromEs: String,
    price: Number,
    priceEs: Number,
    reference: String,
    referenceEs: String,
    location: String,
    locationEs: String,
    deposit: Number,
    depositEs: Number,
    parking: String,
    parkingEs: String,
    bills: String,
    billsEs: String,
    length: String,
    lengthEs: String,
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