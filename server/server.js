/**
 *
 * handles all the requests and responses of the server
 *
 * req.craft object that contains the following:
 * - authenticated: boolean
 * - message: string
 * - account: object (contains the id token info)
 * - package: object (contains the route response)
 *
 */

import cors from 'cors';
import multer from 'multer';
import express from 'express';
import { Logger } from './routes/middleware/logger.js';
import { Google } from './routes/middleware/google.js';
import { StudentController } from './routes/controller/student.js';
import { StudentMiddleware } from './routes/middleware/student.js';

// multer allows us to read the file from the request
const Uploaded = multer({ storage: multer.memoryStorage() });

// express app
const App = express();

/**
 * This is a proxy option for the dev server.
 * It will proxy /api from the client to the routes.
 * Handles Cross-Origin Resource Sharing (CORS) errors.
 */
App.use(cors());

/**
 *
 * verify initializes the authenticate middleware and it creates the req.craft
 * listen reads the output of verify and logs all requests to database
 * authenticate is used by a specific route if it needs to be authenticated
 *
 */
App.use(Google.verify, StudentMiddleware.has_self_data, Logger.listen);

// get self student data
App.get(
	'/api/student/get_self_data',
	Google.authenticate,
	StudentMiddleware.has_self_data,
	StudentController.get_self_data
);

// extract data from uploaded student cor pdf
// and temporarily store it to temp_cor_extract object
// if unsupported, save to temp folder for future debugging
App.post(
	'/api/student/post_extract_corpdf',
	Google.authenticate,
	Uploaded.single('corpdf'),
	StudentMiddleware.has_empty_data,
	StudentController.post_extract_corpdf
);

// saves temp_cor_extract file to misc
// and inserts data to the database
App.post(
	'/api/student/post_import_corpdf',
	Google.authenticate,
	StudentMiddleware.has_empty_data,
	StudentController.post_import_corpdf
);

const PORT = 5000;
App.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
