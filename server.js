/**
 * handles all the requests and responses
 * of the server 
 */

import express from 'express';
import { logger } from './server/routes/middleware/logger.js';
import { verify, auth } from './server/routes/middleware/google.js';

const app = express();

// verify middleware initializes the auth middleware and 
// updates req.craft.log and logs all reqeust to database
app.use(verify, logger);



// /api/student/
// // get self student data

// app.get('/api/student', (req, res) => {
//   res.send('Hello World!');
// });

// /api/student/setup
// // post student certificate of registration
// // middleware to extract student data from cor
// // middleware to check if student data exists
// // update if student data already exists


// /api/student/delete
// // delete self student data (non cascading)


// /api/schedule
// // get all schedules


// /api/subject
// // get all subjects



const PORT = 3000;
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