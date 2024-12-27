const Visitor = require('../models/Visitor');
const Review = require('../models/Review');

// Get all visitors
exports.getAllVisitors = async (req, res, next) => {
    try {
        const visitors = await Visitor.find().populate('visitedAttractions', 'name');
        res.status(200).json(visitors);
    } catch (error) {
        next(error);
    }
};

// Get a visitor by ID
exports.getVisitorById = async (req, res, next) => {
    try {
        const visitor = await Visitor.findById(req.params.id).populate('visitedAttractions', 'name');
        if (!visitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }
        res.status(200).json(visitor);
    } catch (error) {
        next(error);
    }
};

// Create a new visitor
exports.createVisitor = async (req, res, next) => {
    try {
        const { name, email, visitedAttractions } = req.body;

        const newVisitor = new Visitor({
            name,
            email,
            visitedAttractions,
        });

        await newVisitor.save();
        res.status(201).json(newVisitor);
    } catch (error) {
        next(error);
    }
};

// Update a visitor
exports.updateVisitor = async (req, res, next) => {
    try {
        const updatedVisitor = await Visitor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('visitedAttractions', 'name');
        if (!updatedVisitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }
        res.status(200).json(updatedVisitor);
    } catch (error) {
        next(error);
    }
};

// Delete a visitor
exports.deleteVisitor = async (req, res, next) => {
    try {
        const deletedVisitor = await Visitor.findByIdAndDelete(req.params.id);
        if (!deletedVisitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }
        res.status(200).json({ message: 'Visitor deleted successfully' });
    } catch (error) {
        next(error);
    }
};

exports.getVisitorsActivity = async (req, res, next) => {
    try {
        // Aggregate the number of reviews each visitor has made
        const visitorsWithReviewCount = await Visitor.aggregate([
            {
                $lookup: {
                    from: 'reviews',  // The collection to join (reviews)
                    localField: '_id', // Field in Visitor to match
                    foreignField: 'visitor',  // Field in Review to match
                    as: 'reviews'  // Alias for the joined data
                }
            },
            {
                $project: {
                    name: 1,  // Include visitor's name
                    email: 1,  // Include visitor's email
                    reviewCount: { $size: '$reviews' }  // Count the number of reviews
                }
            }
        ]);

        // Return the list of visitors with their review count
        res.status(200).json(visitorsWithReviewCount);
    } catch (error) {
        next(error);  // Pass any errors to the error handler
    }
};
