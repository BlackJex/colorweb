var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;

var colorSchema = new Schema({
 CODICE: String,
  H: Number,
  S: Number,
  L: Number
 
},  { collection : 'PELLI' });
var Colori = mongoose.model('Colori',colorSchema);

module.exports = Colori;
/*
var colorinput = new Schema({
 CODICE: String,
 
},  { collection : 'PELLI'});

var colInput = mongoose.model('colInput',colorinput);

module.exports = colInput;*/