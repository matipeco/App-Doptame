const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const petSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: String, required: true },
    size: {
      type: String,

      enum: ["chico", "mediano", "grande"],

      required: true,
    },

    type: { type: String, enum: ["perro", "gato", "otros"], required: true },

    image: { type: String, required: true },

    description: { type: String, required: true },
    adoption: { type: Boolean, default: true },
    status: { type: Boolean, default: true },
    apa: { type: Schema.Types.ObjectId, ref: "Apa"}

  },
  {
    timestamps: true,
  }
);
const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
