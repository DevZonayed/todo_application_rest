const { CreateUser, LoginUser } = require("../Controllers/UserController");
const limiter = require("../middleware/Security/ReqLimiter");

// Import all dependencies
const UserRoute = require("express").Router();

// Create User
UserRoute.post("/CreateUser", CreateUser);
// Login User
UserRoute.post("/LoginUser", LoginUser);

// User Read Route
UserRoute.get("/", limiter(30, 10), (req, res) => {
  res.json({
    message: "User Get Success",
  });
});

module.exports = UserRoute;
