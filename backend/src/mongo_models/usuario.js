const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  _id: String, //El username es el ID
  nombre: String,
  genero: String,
  edad: Number,
  privilegios: String,
  contrasena: String
});

module.exports = mongoose.model("Usuario", usuarioSchema);
