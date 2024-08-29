const Advertisement = require('../models/advertisementModel.js');
const path = require('path');

// Upload a new advertisement
const uploadAdvertisement = async (req, res) => {
  try {
    // Handle file upload
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const newAdvertisement = new Advertisement({
      imageUrl,
    });

    await newAdvertisement.save();

    res.status(201).json({
      message: 'Advertisement uploaded successfully',
      advertisement: newAdvertisement,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all advertisements
const getAdvertisements = async (req, res) => {
  try {
    const advertisements = await Advertisement.find().sort({ uploadedAt: -1 });
    res.status(200).json(advertisements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an advertisement
const deleteAdvertisement = async (req, res) => {
    try {
      console.log('Deleting advertisement with ID:', req.params.id);
      const advertisement = await Advertisement.findById(req.params.id);
      if (!advertisement) {
        return res.status(404).json({ message: 'Advertisement not found' });
      }
  
      await advertisement.deleteOne();
      res.status(200).json({ message: 'Advertisement deleted successfully' });
    } catch (error) {
      console.error('Error deleting advertisement:', error);
      res.status(500).json({ message: error.message });
    }
  };
  
  

module.exports = {
  uploadAdvertisement,
  getAdvertisements,
  deleteAdvertisement,
};
