const mongoose = require("mongoose");

const camionSchema = new mongoose.Schema({
  _id: String, //Las placas son el ID
  marca: String,
  modelo: String,
  anio: String,
  color: String,
  pilotoID: String
});

module.exports = mongoose.model("Camion", camionSchema);
