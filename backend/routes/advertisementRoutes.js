const express = require('express');
const multer = require('multer');
const { uploadAdvertisement, getAdvertisements, deleteAdvertisement } = require('../controllers/advertisementController.js');

const advertisementRouter = express.Router();

// Configure multer for file upload
const upload = multer({ dest: 'uploads/' });

advertisementRouter.post('/upload-advertisements', upload.single('image'), uploadAdvertisement);
advertisementRouter.get('/get-advertisements', getAdvertisements);
advertisementRouter.delete('/:id', deleteAdvertisement);


module.exports = advertisementRouter;
