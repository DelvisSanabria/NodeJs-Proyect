const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  nombre: {
    type: String,
    minlength: 1,
    maxlength: 100,
    required: true,
  },
  apellido: {
    type: String,
    minlength: 1,
    maxlength: 100,
    required: true,
  },
  email: {
    type: String,
    minlength: 1,
    maxlength: 100,
    required: true,
  },
  contrasena: {
    type: String,
    minlength: 1,
    maxlength: 100,
    required: true,
  }
},{
  timestamps: true
});

//crear un modelo
const User = mongoose.model("User", UserSchema);

module.exports = User