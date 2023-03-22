const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypr = require("bcryptjs");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    last_name: { type: String },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    location: { type: String },
    image: { type: String },
    favorites: [{ type: Schema.Types.ObjectId, ref: "Pet" }],
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    versionKey: false,
    timestamp: false,
  }
);

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypr.genSalt(10);
  return await bcrypr.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  await bcrypr.compare(password, receivedPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
