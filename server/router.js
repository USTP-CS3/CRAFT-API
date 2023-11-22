import express from 'express';
import {
 Student,
 Schedule,
 Faculty,
 Room,
 Subject,
} from '../db/model/models.js';
import uploads from './uploadHandling.js'; // Import file upload handling module

const router = express.Router(); // Create a new Express router

/**
 * GET endpoint to fetch all students.
 * Responds with a list of all students in JSON format.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
router.get('/', async (req, res) => {
 const response = await Student.findAll(); // Fetch all students
 res.status(200).json(response); // Send the list of students as JSON
});

// Placeholder comments for future implementation of POST, PUT, DELETE methods
// TODO: Implement GET methods as needed
// TODO: Implement POST methods as needed
// TODO: Implement PUT methods as needed
// TODO: Implement DELETE methods as needed

router.post('/uploads', uploads.array('files'), async (req, res) => {
 console.log(req.files); // Log uploaded files information
 res.status(200).json(req.files); // Respond with information about the uploaded files
});

export default router;
