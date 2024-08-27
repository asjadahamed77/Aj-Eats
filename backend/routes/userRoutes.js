const express = require('express');
const userRouter = express.Router();
const { register, login, googleAuth, logout } = require('../controllers/userController.js');

// Register a new user
userRouter.post('/register', register);

// Log in a user
userRouter.post('/login', login);

// Google authentication
userRouter.post('/google-auth', googleAuth);

// Log out a user
userRouter.post('/logout', logout);

module.exports = userRouter;
