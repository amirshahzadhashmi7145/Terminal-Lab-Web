const express = require('express');
const attractionController = require('../controllers/attractionController');
const router = express.Router();

// CRUD Routes
router.get('/top-rated', attractionController.getTopRatedAttractions); //top 5 attraction
router.get('/', attractionController.getAllAttractions); // Get all attractions
router.get('/:id', attractionController.getAttractionById); // Get specific attraction by ID
router.post('/', attractionController.createAttraction); // Create a new attraction
router.put('/:id', attractionController.updateAttraction); // Update an existing attraction
router.delete('/:id', attractionController.deleteAttraction); // Delete an attraction


module.exports = router;
