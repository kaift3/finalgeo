const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const LogoutRouter = express.Router();

LogoutRouter.get("/", async (req, res) => {
  res.cookie("token", "", { maxAge: 1 });
  console.log("logged out successfully");
  res.json({ message: "logged out successfully" });
});

module.exports = LogoutRouter;
