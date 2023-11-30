import multer from 'multer'; // For handling file uploads
import path from 'path';
import { fileURLToPath } from 'url';

// Get full directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Store uploaded files in misc folder
const storage = multer.diskStorage({
 destination: function (req, file, callback) {
  callback(null, path.join(__dirname, '../server/', 'misc'));
 },
 filename: function (req, file, callback) {
  callback(null, file.originalname);
 },
});

const uploads = multer({ storage: storage });

export default uploads;
