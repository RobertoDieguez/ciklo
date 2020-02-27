const mongoose = require("mongoose");

const paqueteSchema = new mongoose.Schema({
  data: String,
  destino: String,
  camionID: String,
  placedBy: String
});

module.exports = mongoose.model("Paquete", paqueteSchema);
