const User = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Registration
const register = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    try {
        // Check if the user already exists by email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the new user to the database
        await newUser.save();

        // Generate a JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "10h",
        });

        // Set the token as an HTTP-only cookie
        res.cookie("token", token, { httpOnly: true });

        // Send a success response
        res.status(201).json({ message: "User registered successfully", token, user: newUser });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};

// User Login
const login = async (req, res) => {
    const { identifier, password } = req.body; // 'identifier' can be either email or username

    try {
        // Find the user by either email or username
        const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }]
        });
        if (!user) {
            return res.status(400).json({ error: "Invalid username/email or password" });
        }

        // Check if the provided password matches the stored password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid username/email or password" });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "10h",
        });

        // Set the token as an HTTP-only cookie
        res.cookie("token", token, { httpOnly: true });

        // Send a success response
        res.status(200).json({ message: "User logged in successfully", token, user });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};

// Google Authentication
const googleAuth = async (req, res) => {
    const { email, username } = req.body;

    try {
        // Find the user by email, or create a new one if it doesn't exist
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ email, username, password: "" });
            await user.save();
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "10h",
        });

        // Set the token as an HTTP-only cookie
        res.cookie("token", token, { httpOnly: true });

        // Send a success response
        res.status(200).json({ message: "Google authentication successful", token, user });
    } catch (error) {
        console.error("Google authentication error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};

// User Logout
const logout = (req, res) => {
    // Clear the token cookie
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
};

module.exports = {
    register,
    login,
    googleAuth,
    logout,
};
