const Food = require('../models/foodModel.js');

// Add a new food item
const addFood = async (req, res) => {
  try {
    const { name, category, price, description } = req.body;
    const imageUrl = req.file ? `${req.file.filename}` : null;
    console.log('Uploaded file:', req.file);
    const newFood = new Food({
      name,
      category,
      price,
      description,
      imageUrl,
    });

    await newFood.save();
    res.status(201).json(newFood);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add food item' });
  }
};

// Get all food items
const getFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food items' });
  }
};

// Get food item by ID
const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ error: 'Food item not found' });
    }
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food item' });
  }
};

// Update a food item
const updateFood = async (req, res) => {
  try {
    const { name, category, price, description } = req.body;
    const imageUrl = req.file ? `${req.file.filename}` : req.body.imageUrl;

    const updatedFood = await Food.findByIdAndUpdate(
      req.params.id,
      {
        name,
        category,
        price,
        description,
        imageUrl,
      },
      { new: true }
    );

    if (!updatedFood) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    res.status(200).json(updatedFood);
  } catch (error) {
    console.error('Error adding food item:', error.message);
    res.status(500).json({ error: 'Failed to update food item' });
  }
};

// Delete a food item
const deleteFood = async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.id);
    if (!deletedFood) {
      return res.status(404).json({ error: 'Food item not found' });
    }
    res.status(200).json({ message: 'Food item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete food item' });
  }
};

module.exports = {
  addFood,
  getFoods,
  getFoodById,
  updateFood,
  deleteFood,
};
