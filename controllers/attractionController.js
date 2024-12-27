const Attraction = require('../models/Attraction');

// Get all attractions
exports.getAllAttractions = async (req, res, next) => {
    try {
        const attractions = await Attraction.find();
        res.status(200).json(attractions);
    } catch (error) {
        next(error);
    }
};

exports.getTopRatedAttractions = async (req, res, next) => {
    console.log("Here")
    try {
        // Fetch the top 5 rated attractions, sorted by rating in descending order
        const topRatedAttractions = await Attraction.find()
            .sort({ rating: -1 })    // Sort by rating in descending order
            .limit(5);               // Limit the result to top 5 attractions

        // Return the top-rated attractions
        res.status(200).json(topRatedAttractions);
    } catch (error) {
        next(error);  // Pass any errors to the error handler
    }
};

// Get attraction by ID
exports.getAttractionById = async (req, res, next) => {
    try {
        const attraction = await Attraction.findById(req.params.id);
        if (!attraction) {
            return res.status(404).json({ message: 'Attraction not found' });
        }
        res.status(200).json(attraction);
    } catch (error) {
        next(error);
    }
};

// Create a new attraction
exports.createAttraction = async (req, res, next) => {
    try {
        const newAttraction = new Attraction(req.body);
        await newAttraction.save();
        res.status(201).json(newAttraction);
    } catch (error) {
        next(error);
    }
};

// Update an attraction
exports.updateAttraction = async (req, res, next) => {
    try {
        const updatedAttraction = await Attraction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedAttraction) {
            return res.status(404).json({ message: 'Attraction not found' });
        }
        res.status(200).json(updatedAttraction);
    } catch (error) {
        next(error);
    }
};

// Delete an attraction
exports.deleteAttraction = async (req, res, next) => {
    try {
        const deletedAttraction = await Attraction.findByIdAndDelete(req.params.id);
        if (!deletedAttraction) {
            return res.status(404).json({ message: 'Attraction not found' });
        }
        res.status(200).json({ message: 'Attraction deleted successfully' });
    } catch (error) {
        next(error);
    }
};
