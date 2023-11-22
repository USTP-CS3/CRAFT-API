import express from 'express';
import apiRoutes from './router.js';
import { session, dbConnection } from '../db/database.js';
import cors from 'cors';

// Initialize Express application
const app = express();

// Apply middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON payloads in requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads

// API routes
app.use('/api', apiRoutes); // Mount API routes at '/api' path

// Set the port
const port = process.env.PORT || 3000;

/**
 * Global error handling middleware.
 * Catches and handles any errors that occur during request processing.
 *
 * @param {Error} err - The error object.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - Function to invoke the next middleware.
 */
app.use((err, req, res, next) => {
 console.log(err);
 res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, async () => {
 console.log(`Server is running on port ${port}`);
 await dbConnection(); // Establish database connection
});
