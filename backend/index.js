const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const userRouter = require('./routes/userRoutes.js');

dotenv.config();
// In your main server file, right after loading dotenv
console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET);


const app = express();

app.use(cors({
  origin: ['http://localhost:3001'], 
  credentials: true, 
}));

// Middleware to parse cookies and JSON bodies
app.use(cookieParser());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });


app.use('/user', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
