const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  size: { type: String, enum: ["small", "medium", "big"], required: true },
  type: { type: String, required: true },
  image: { type: Text, required: true },
  apa: { type: Schema.Types.ObjectId, ref: "Apa" }, // referencia a Apa por ID
  // location: hacer conexión con APA
});
const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
