const User = require('../models/userModel.js');
require('dotenv').config();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { errorHandler } = require('../utils/errorHandler.js')


const updateUser = async (req, res, next) => {
    // Ensure the user can only update their own account
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, 'You can only update your own account!'));
    }
  
    try {
      const { username, email, password, phone, address, userImage } = req.body;
      const updateData = { username, email, phone, address, userImage };
  
      // Hash the new password if provided
      if (password) {
        updateData.password = bcryptjs.hashSync(password, 10);
      }
  
      // Update the user in the database
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: updateData },
        { new: true }
      );
  
      if (!updatedUser) {
        return next(errorHandler(404, 'User not found!'));
      }
  
      // Generate a new token with the updated user information
      const token = jwt.sign(
        { id: updatedUser._id, email: updatedUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '10h' } // Adjust the expiration time as needed
      );
  console.log("Updated Token:",token)
      // Exclude the password from the response
      const { password: pwd, ...rest } = updatedUser._doc;
  
      // Send the updated user data and new token back to the frontend
      res.status(200).json({ user: rest, token });
    } catch (error) {
      next(error);
    }
  };
  
  

  const getUserById = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      next(error); // Pass the error to the error handling middleware
    }
  };
  const getAllUsers = async (req, res, next) => {
    try {
      const users = await User.find(); // Fetch all users
  
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      next(error); // Pass the error to the error handling middleware
    }
  };

  module.exports = {updateUser,getUserById,getAllUsers}