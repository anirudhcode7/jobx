const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
// Import other routes as needed
const db = require('./config/db'); // Import the database connection

const authRoutes = require('./routes/auth'); // Import your authentication routes


// Create an instance of the Express application
const app = express();

// Middleware for parsing JSON and handling CORS
app.use(bodyParser.json());
app.use(cors());

// Use your authentication routes
app.use('/api/auth', authRoutes);

// Define and use other routes here

// Define other server setup, middleware, and error handling as needed

// Start the server
const port = process.env.PORT || 3000;
console.log("Port: ", port)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
