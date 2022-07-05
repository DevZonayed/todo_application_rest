// Import All Important Files
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

// Token Validations
function isLogin(req, res, next) {
  const header = req.headers;

  if (!header.authorization) {
    res.status(403).json({
      message: "please login fast",
    });
    return;
  }

  //   Check the token
  const token = header.authorization.split(" ").pop();
  const userdata = jwt.decode(token, process.env.TOKEN_SICREAT);

  if (!userdata) {
    res.status(403).json({
      message: "Invalid Token",
    });
    return;
  }

  //   Send User Data To Main Request
  req.user_id = userdata.id;
  req.user_name = userdata.name;
  req.username = userdata.username;
  req.user_image = userdata.image;
  req.user_auth = true;
  next();
}

module.exports = isLogin;
