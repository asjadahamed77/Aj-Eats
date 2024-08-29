require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET; // Make sure this is not undefined

// Check if JWT_SECRET is loaded
console.log("JWT_SECRET:", secret);

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token; // Assuming the token is stored in cookies

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ error: 'No token provided' });
  }

  // Debugging information
  console.log("Token received:", token);

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      console.log("Invalid token");
      return res.status(403).json({ error: 'Invalid token' });
    }

    req.user = user; // Store user info in request
    console.log("Authenticated user:", req.user); // Debugging line

    next();
  });
};

module.exports = authenticateToken;
