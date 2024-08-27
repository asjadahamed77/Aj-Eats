const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const userRouter = require('./routes/userRoutes.js');

// Load environment variables from .env file
dotenv.config();


const app = express();

// CORS setup to allow credentials and specify the frontend origin
app.use(cors({
  origin: ['http://localhost:3000'], // Specify the frontend URLs
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// Middleware to parse cookies and JSON bodies
app.use(cookieParser());
app.use(express.json());

// Connect to MongoDB using the URI from environment variables
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Your routes and other application logic will go here

app.use('/user', userRouter);

// Start the server on the specified port or default to port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
