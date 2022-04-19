const jwt = require("jsonwebtoken");

const createToken = (user) => {
  const token = jwt.sign({ email: user.email, name: user.name }, "secret");
  return token;
};

const validateToken = (req, res, next) => {
  const token = req.cookies["token"];

  if (!token) {
    return res.status(400).json({ message: "user not authenticated" });
  }
  try {
    const validToken = jwt.verify(token, "secret"); //validToken is just a boolean that will tell us valid or not
    if (validToken) {
      req.isAuthenticated = true;
      return next();
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = { createToken, validateToken };
