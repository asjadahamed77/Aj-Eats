const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  addFood,
  getFoods,
  getFoodById,
  updateFood,
  deleteFood,
} = require('../controllers/foodController');

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
router.post('/add', upload.single('image'), addFood);

// Get all food items
router.get('/', getFoods);

// Get a food item by ID
router.get('/:id', getFoodById);

// Update a food item
router.put('/:id', upload.single('image'), updateFood);

// Delete a food item
router.delete('/:id', deleteFood);

module.exports = router;
