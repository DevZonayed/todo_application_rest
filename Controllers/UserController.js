const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

// This Controller for create a user
async function CreateUser(req, res) {
  try {
    const userData = await req.body;
    // Pass Hash Script bellow
    const hash = await bcrypt.hash(userData.password, 10);

    // Add to user With Hash Password
    const UserDetails = new User({ ...userData, password: hash });

    // Save The pass to Database
    const data = await UserDetails.save();

    /**
     * Send A Token to user
     */
    const token = jwt.sign(
      {
        id: data._id,
        name: data.name,
        image: data.image,
        username: data.username,
      },
      process.env.TOKEN_SICREAT
    );
    // Final Response With token and data
    res.status(201).json({
      message: "Data add successfully",
      token: token,
      data,
    });
  } catch (err) {
    res.status(400).json({
      message: `data add unsuccessfull error : ${err}`,
    });
  }
}

// Login Controllers
async function LoginUser(req, res) {
  const { username, password } = await req.body;
  try {
    // Quary For Data Search
    const quary = { username: username.trim() };
    // Find the exact user
    const user = await User.findOne(quary);

    if (!user) {
      res.status(403).json({
        message: "Username Mismatch",
      });
      return;
    }
    // Match The Password
    const match = await bcrypt.compare(password.trim(), user.password);
    if (!match) {
      res.status(403).json({
        message: "Password Mismatch",
      });
      return;
    }

    // Genarate A Token
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        username: user.username,
        image: user.image,
        iat: Date.now(),
      },
      process.env.TOKEN_SICREAT,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login Successfull",
      token: token,
      data: {
        id: user._id,
        name: user.name,
        username: user.username,
        image: user.image,
      },
    });
  } catch (err) {
    res.status(403).json({
      message: `Data mismatch : ${err}`,
    });
  }
}

module.exports = { CreateUser, LoginUser };
