const User = require("../models/user");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { findOne } = require("../models/user");

const { createToken } = require("../JWT");
const LoginRouter = express.Router();

LoginRouter.post("/", async (req, res) => {
  console.log(req.body);
  const password = req.body.password;
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).json({ error: "user not found" });
  }

  const dbPassword = user.password;

  bcrypt.compare(password, dbPassword).then((match) => {
    if (!match) {
      res.status(400).json({ error: "invalid password" });
    } else {
      const token = createToken(user);
      res.cookie("token", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      });
      res.json({ message: "Logged In", token: token });
      console.log("logged in successfully");
    }
  });
});

module.exports = LoginRouter;
