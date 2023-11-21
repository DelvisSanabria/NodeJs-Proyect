const mongoose = require("mongoose");
const ProductSchema = mongoose.Schema({
  nombre: {
    type: String,
    minlength: 1,
    maxlength: 100,
    required: true,
  },
  precio: {
    type: Number,
    min: 0,
    required: true,
  },
  inventario: {
    type: Number,
    min: 0,
    required: true,
  }
},{
  timestamps: true
});

//crear un modelo
const Product = mongoose.model("Product", ProductSchema);

module.exports = Product