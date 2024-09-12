const express = require('express');
const foodRouter = express.Router();
const multer = require('multer');
const {
  addFood,
  getFoods,
  getFoodById,
  updateFood,
  deleteFood,
} = require('../controllers/foodController.js');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });



// Add a new food item
foodRouter.post('/add', upload.single('image'), addFood);

// Get all food items
foodRouter.get('/', getFoods);

// Get a food item by ID
foodRouter.get('/:id', getFoodById);

// Update a food item
foodRouter.put('/:id', upload.single('image'), updateFood);

// Delete a food item
foodRouter.delete('/:id', deleteFood);

module.exports = foodRouter;
