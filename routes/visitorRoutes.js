const express = require('express');
const visitorController = require('../controllers/visitorController');
const router = express.Router();

// CRUD Routes
router.get('/activity', visitorController.getVisitorsActivity);
router.get('/', visitorController.getAllVisitors); // Get all visitors
router.get('/:id', visitorController.getVisitorById); // Get visitor by ID
router.post('/', visitorController.createVisitor); // Create a new visitor
router.put('/:id', visitorController.updateVisitor); // Update an existing visitor
router.delete('/:id', visitorController.deleteVisitor); // Delete a visitor

module.exports = router;
