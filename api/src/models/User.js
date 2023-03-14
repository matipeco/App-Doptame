const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  pet: { type: Schema.Types.ObjectId, ref: "Pet" },
  address: { type: String, required: true }
});
const User = mongoose.model("User", userSchema);

module.exports = User;
