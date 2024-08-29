const User = require("../models/userModel.js");
require('dotenv').config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/errorHandler.js");


// User Registration
const register = async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return next(errorHandler(400, "Passwords do not match"));
  }
  try {
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return next(errorHandler(400, "Username or email already exists!"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
      user: { username: newUser.username, email: newUser.email },
    });
  } catch (error) {
    console.error("Registration error:", error);
    next(errorHandler(500, "Server error. Please try again later."));
  }
};

// User Login
const login = async (req, res, next) => {
  const { identifier, password } = req.body;

  try {
    const validUser = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!validUser) {
      return next(errorHandler(400, "Invalid username/email or password"));
    }

    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong credentials!"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "Strict",
    });

    const { password: _, ...userDetails } = validUser._doc;

    res.status(200).json({
      message: "User logged in successfully",
      token,
      user: userDetails,
    });
  } catch (error) {
    console.error("Login error:", error);
    next(errorHandler(500, "Server error. Please try again later."));
  }
};

// Google Authentication
const googleAuth = async (req, res, next) => {
  try {
    const { email, name, userImage } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "10h",
      });

      const { password, ...userDetails } = user._doc;

      return res
        .cookie("token", token, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        .status(200)
        .json({ message: "Google authentication successful", user: userDetails });
    } else {
      const generatedPassword = Math.random().toString(36).slice(-16);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

      const username =
        name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4);

      user = new User({
        username,
        email,
        password: hashedPassword,
        userImage,
      });

      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "10h",
      });

      const { password, ...userDetails } = user._doc;

      return res
        .cookie("token", token, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        .status(201)
        .json({ message: "Google authentication successful", user: userDetails });
    }
  } catch (error) {
    console.error("Error in Google sign-in:", error);
    next(errorHandler(500, "Server error. Please try again later."));
  }
};

// User Logout
const logout = (req, res) => {
  res.clearCookie("token", { httpOnly: true });
  res.status(200).json({ message: "User logged out successfully" });
};

module.exports = {
  register,
  login,
  googleAuth,
  logout,
};
