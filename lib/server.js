import express from "express";
import bodyParser from "body-parser";

// use curl or shell to send data to 3000 port for testing

const app = express();
const port = 3000;

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// In-memory array to store records
const records = [];

// Route to add records based on COR data
app.post('/addRecords', (req, res) => {
    const corData = req.body;

    // Assuming corData has the structure similar to the output of getCorInfo function
    const { studentData, subjectData } = corData;

    // Add records to the in-memory array (you would typically use a database here)
    records.push({ studentData, subjectData });

    // Send a response
    res.status(200).json({ message: 'Records added successfully' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
