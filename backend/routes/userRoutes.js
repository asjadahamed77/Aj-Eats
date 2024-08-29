const express = require('express');
const userRouter = express.Router();
const { register, login, googleAuth, logout } = require('../controllers/authController.js');
const authenticateToken = require('../utils/authenticateToken.js');
const { updateUser, getUserById, getAllUsers } = require('../controllers/userController.js');


userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/google-auth', googleAuth);
userRouter.post('/logout', logout);

userRouter.post('/update/:id', authenticateToken, updateUser);
userRouter.get('/update-user/:id', authenticateToken, getUserById);
userRouter.get('/get-users',getAllUsers)


module.exports = userRouter;
