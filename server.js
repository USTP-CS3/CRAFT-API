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
import express from 'express';
import { Logger } from './server/routes/middleware/logger.js';
import { Google } from './server/routes/middleware/google.js';
import { StudentController } from './server/routes/controller/student.js';

const app = express();


/**
 * This is a proxy option for the dev server.
 * It will proxy /api from the client to the routes.
 * Handles Cross-Origin Resource Sharing (CORS) errors.
 */
app.use(cors());


/**
 * 
 * verify initializes the auth middleware and it creates the req.craft
 * listen reads the output of verify and logs all requests to database
 * auth is used by a specific route if it needs to be authenticated
 * 
 */
app.use(Google.verify, Logger.listen);

// get self student data
app.get('/api/student', Google.auth, StudentController.get_data);


// /api/student/setup
// post student certificate of registration
// middleware to extract student data from cor
// middleware to check if student data exists
// update if student data already exists
// app.post('/api/student/setup') {}



// /api/student/delete
// // delete self student data (non cascading)


// /api/schedule
// // get all schedules


// /api/subject
// // get all subjects



const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// app.use((req, res, next) => {
//   console.log(req);
//   next();
// });

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });


 // try {
//   const authorization = req.headers.authorization;
//   const user = jwtDecode(authorization);

//   const expireTime = user.exp;
//   const currentTime = Math.floor(Date.now() / 1000);
//   const isExpired = currentTime > expireTime

//   (isExpired) 
//     ? res.status(401).json({message: 'Token expired'})
//     : next();
// }


// (self-executing async function)--------------------------------------------------------------------------
// (async function main() {

//     const logger = Logger('./log/main.log')


//     // extracts the info from the pdf file
//     try {

//         // TODO: integrate website to the extractor
//         const output    = await Extractor.getCorInfo("./misc/cor.pdf");
//         const structure = JSON.stringify(output, null, 4);
//         console.log(structure);
//     } 
//     catch (error) {

//         // TODO: add error handling and logging when COR extraction fails
//         logger.append('');
//         logger.append(error, 'ERROR');
//     }
    

//     // puts the info to the database
//     try {
        
//         // TODO: template for inserting data to the database
//         const st = {
//             first_name: 'Joxyle',
//             last_name: 'Omblero',
//             age: 21,
//             gender: 'L',
//             year_level: '2',
//             nationality: 'Filipino',
//             department: 'IT',
//             email: 'minecraft@email.com',
//             middle_initial: 'b',
//             contact_no: '9353787332',
//         };

//         // create or update (constrained by unique attributes)
//         const [student, isCreated] = await Student.upsert(st);

//         (isCreated) 
//             ? console.log('Student created:', student.toJSON())
//             : console.log('Student updated:', student.toJSON());

//         await synchronize();
//     } 
//     catch (error) {
//         // TODO: add error handling and logging when database sync fails
//         console.error('Error creating or updating student:', error.message);
//     }

// })();