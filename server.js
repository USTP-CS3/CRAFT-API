// import { synchronize } from '.server/db/database.js';

// import Student  from './db/model/Student.js';
// import Subject  from './db/model/Subject.js';
// import Schedule from './db/model/Schedule.js';
// import Room     from './db/model/Room.js';
// import Faculty  from './db/model/Faculty.js';

// import Extractor from "./lib/extractor.js";
// import Logger    from "./lib/logger.js";

import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import { jwtDecode } from "jwt-decode";

const app = express();

// --------------- everything here is public ---------------------
// log all requests to a file (middleware)
// -- morgan library --



// --------------- everything here is private --------------------
// verify token validity (middleware)
// -- google oauth2 library --

/api/student/
// get self student data


/api/student/setup
// post student certificate of registration
// middleware to extract student data from cor
// middleware to check if student data exists
// update if student data already exists


/api/student/delete
// delete self student data (non cascading)


/api/schedule
// get all schedules


/api/subject
// get all subjects



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