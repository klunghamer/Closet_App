var mongoose = require('mongoose');

var ClothingSchema = new mongoose.Schema({
  category: String,
  brand: String,
  color: String,
  size: String,
  imageURL: String
})

var Clothing = mongoose.model('Clothing', ClothingSchema);

module.exports = Clothing;
