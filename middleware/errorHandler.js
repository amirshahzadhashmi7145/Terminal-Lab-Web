// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err); // Log the error for debugging (optional)

    // Handle MongoDB-specific errors
    if (err.name === 'MongoError') {
        return res.status(500).json({
            message: 'Database error occurred',
            error: err.message
        });
    }

    // Handle validation errors (e.g., Mongoose validation)
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Validation error',
            error: err.message
        });
    }

    // Handle CastError (for invalid ObjectId)
    if (err.name === 'CastError') {
        return res.status(400).json({
            message: 'Invalid data format',
            error: err.message
        });
    }

    // Default error handler for other types of errors
    return res.status(500).json({
        message: 'An unexpected error occurred',
        error: err.message
    });
};

module.exports = errorHandler;
