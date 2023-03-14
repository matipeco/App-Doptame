const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const apaSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },

  cbu_cvu: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  url: { type: String, required: true },
  // location: hacer conexión con APA
});
const Apa = mongoose.model("Apa", apaSchema);

module.exports = Apa;
