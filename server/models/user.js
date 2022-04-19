const mongoose = require("mongoose");

//first we make the schema then we make the model

const User = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // phone: { type: String, required: true },
    password: { type: String, required: true },
    quote: { type: String },
  },
  { timestamps: true }
);

const model = mongoose.model("User", User);

module.exports = model;
