'use strict';

var mongoose  = require('mongoose');

var mediaFileSchema = new mongoose.Schema({
  id: {type:String},
  originalname: {type:String},
  encoding: {type:String},
  mimetype: {type:String},
  size: {type:Number}
});

var MediaFile = mongoose.model('MediaFile', mediaFileSchema);

module.exports = MediaFile;
