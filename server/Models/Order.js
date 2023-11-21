const mongoose = require("mongoose");
const OrderSchema = mongoose.Schema({
  usuario: {
    type: String,
    minlength: 1,
    maxlength: 100,
    required: true,
  },
  productos: {
    type: Array,
    min: 0,
    required: true,
  },
  total: {
    type: Number,
    min: 0,
    required: true,
  }
},{
  timestamps: true
});

//crear un modelo
const Order = mongoose.model("Order", OrderSchema);

module.exports = Order