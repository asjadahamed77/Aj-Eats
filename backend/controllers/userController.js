const User = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Registration
const register = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "10h",
        });

        res.cookie("token", token, { httpOnly: true });
        res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
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

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid username/email or password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "10h",
        });

        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({ message: "User logged in successfully", token });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Google Authentication
const googleAuth = async (req, res) => {
    const { email, username } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ email, username, password: "" });
            await user.save();
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({ message: "Google authentication successful", token });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};

// User Logout
const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
};

module.exports = {
    register,
    login,
    googleAuth,
    logout,
};
