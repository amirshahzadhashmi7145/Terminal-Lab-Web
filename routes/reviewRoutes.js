const express = require('express');
const reviewController = require('../controllers/reviewController');
const router = express.Router();

// Get all reviews for a specific attraction
router.get('/attraction/:attractionId', reviewController.getReviewsByAttraction);

// Get a specific review by ID
router.get('/:id', reviewController.getReviewById);

// Create a new review
router.post('/', reviewController.createReview);

// Update an existing review
router.put('/:id', reviewController.updateReview);

// Delete a review
router.delete('/:id', reviewController.deleteReview);

module.exports = router;
