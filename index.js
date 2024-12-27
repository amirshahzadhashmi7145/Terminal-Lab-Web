const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db')
const attractionRoutes = require('./routes/attractionRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const visitorRoutes = require('./routes/visitorRoutes')
const errorHandler = require('./middleware/errorHandler');

const app = express();

require('dotenv').config();

app.use(bodyParser.json());
app.use(cors());

//routes
app.use('/api/attractions', attractionRoutes);
app.use('/api/reviews', reviewRoutes)
app.use('/api/visitors', visitorRoutes)

//middleware
app.use(errorHandler)

db()

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
