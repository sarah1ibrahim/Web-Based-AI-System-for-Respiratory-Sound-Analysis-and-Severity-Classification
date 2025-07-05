// Backend/app.js
// Import required dependencies
const express = require('express'); // Express web framework
const mongoose = require('mongoose'); // MongoDB ODM
const dotenv = require('dotenv'); // Load environment variables
dotenv.config(); // Initialize dotenv configuration
const cors = require('cors');

// Initialize Express application
const app = express();
// Parse JSON request bodies
app.use(express.json());
app.use(cors());


// Connect to MongoDB database using connection string from environment variables
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB')) // Log successful connection
    .catch((error) => console.log('Could not connect to MongoDB...', error)); // Log connection errors



// Register route handlers
// Home routes for main functionality
app.use('/home', require('./routes/home'));
app.use('/home', require('./routes/uploadAudio'));



const port = 5000; // Changed from 3000 to 5000
// Start server and listen on specified port
app.listen(port, () => {
    // Log server startup information
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${port}`);
    console.log(`http://localhost:${port}`);
});
