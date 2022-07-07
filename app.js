// Import All Require Files
const express = require("express");
const TodoRoute = require("./Routes/TodoRouts");

// Application Init
const app = express();

// Import Alll Security Middleware
const cors = require("cors");
const halmet = require("helmet");
const hpp = require("hpp");
const limiter = require("./middleware/Security/ReqLimiter");
const UserRoute = require("./Routes/UserRouts");
const isLogin = require("./middleware/Authentication/auth");

// Config All Security Middleware
app.use(
  cors({
    origin: "https://jonayed.me",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(halmet());
app.use(hpp());

// Body Parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// User Routes
app.use("/api/v1/user", UserRoute);

// Todo List Routes
app.use("/api/v1/todo", limiter(), isLogin, TodoRoute);

// Login check
app.get("/api/v1/userauth", isLogin, (req, res) => {
  const login = req.user_auth;
  if (!login) {
    res.status(401).json({
      message: "Data UnAuthorize",
    });
    return;
  }

  res.status(200).json({
    data: {
      userId: req.user_id,
      name: req.user_name,
      userName: req.username,
      image: req.user_image,
    },
  });
});
//Application export for listening
module.exports = app;
