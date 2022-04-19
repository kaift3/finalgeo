const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const SignUpRouter = require("./Routes/SignUpRouter");
const LoginRouter = require("./Routes/LoginRouter");
const LogoutRouter = require("./Routes/LogoutRouter");
const { validateToken } = require("./JWT");

const app = express();

const Mongo_uri =
  "mongodb+srv://anurag:anurag1@testcluster1.tuwaw.mongodb.net/Testcluster1?retryWrites=true&w=majority";

mongoose.connect(Mongo_uri).then(console.log("Mongodb Atlas connected"));

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/hello", (req, res) => {
  res.send("Hello guys from server");
});

app.get("/profile", validateToken, (req, res) => {
  res.send("profile");
});

app.use("/signup", SignUpRouter);
app.use("/login", LoginRouter);
app.use("/logout", LogoutRouter);

app.listen(3001, () => {
  console.log("Server running on 3001");
});
