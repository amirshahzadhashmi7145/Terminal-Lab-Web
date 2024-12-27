const Review = require('../models/Review');
const Visitor = require('../models/Visitor');

// Get all reviews for a specific attraction
exports.getReviewsByAttraction = async (req, res, next) => {
    try {
        const reviews = await Review.find({ attraction: req.params.attractionId })
            .populate('visitor', 'name') // Optionally, populate visitor info
            .populate('attraction', 'name'); // Optionally, populate attraction info
        res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
};

// Get review by ID
exports.getReviewById = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.id)
            .populate('visitor', 'name') // Populate visitor info
            .populate('attraction', 'name'); // Populate attraction info
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        next(error);
    }
};

// Create a new review
exports.createReview = async (req, res, next) => {
    try {
        const { attraction, visitor, score, comment } = req.body;

        // Check if the visitor has already visited the attraction
        const visitorRecord = await Visitor.findById(visitor);
        if (!visitorRecord) {
            return res.status(404).json({ message: 'Visitor not found' });
        }

        // Check if the visitor has visited the attraction
        if (!visitorRecord.visitedAttractions.includes(attraction)) {
            return res.status(400).json({ message: 'Visitor must have visited the attraction before reviewing' });
        }

        // Check if the visitor has already reviewed this attraction
        const existingReview = await Review.findOne({ attraction, visitor });
        if (existingReview) {
            return res.status(400).json({ message: 'Visitor has already reviewed this attraction' });
        }

        // Create a new review
        const newReview = new Review({
            attraction,
            visitor,
            score,
            comment,
        });

        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        next(error);
    }
};

// Update a review
exports.updateReview = async (req, res, next) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('visitor', 'name').populate('attraction', 'name');
        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(updatedReview);
    } catch (error) {
        next(error);
    }
};

// Delete a review
exports.deleteReview = async (req, res, next) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        next(error);
    }
};
