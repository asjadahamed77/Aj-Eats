const User = require('../models/userModel.js'); // Adjust the path as needed

// Get user details
const getUserDetails = async (req, res) => {
  try {
    const userId = req.user._id; // Use req.user._id instead of req.userId

    const user = await User.findById(userId).select('username email phone address profileImage');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      username: user.username,
      email: user.email,
      phone: user.phone,
      address: user.address,
      profileImage: user.profileImage // Optional, if you have a profile image
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = getUserDetails;
