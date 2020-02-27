const mongoose = require("mongoose");

const pilotoSchema = new mongoose.Schema({
  _id: String, //El numero de DPI es el ID
  nombre: String,
  genero: String,
  edad: Number,
  camionID: String
});

module.exports = mongoose.model("Piloto", pilotoSchema);
