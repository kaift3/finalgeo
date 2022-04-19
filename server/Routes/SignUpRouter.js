const User = require("../models/user");
const express = require("express");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const SignUpRouter = express.Router();

SignUpRouter.post("/", async (req, res) => {
  console.log(req.body);

  bcrypt.hash(req.body.password, 10, (err, hashedpass) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    try {
      User.create({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        // phone: req.body.phone,
        password: hashedpass,
      });
      res.json({ status: "ok signed up successfully" });
    } catch (err) {
      console.log(err);
      //res.status(400).json({ status: "error", error: "Duplicate email" });
    }
  });
});

module.exports = SignUpRouter;
