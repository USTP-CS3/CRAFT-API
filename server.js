import Student from './server/db/model/Student.js';
import Subject from './server/db/model/Subject.js';
import Schedule from './server/db/model/Schedule.js';

import setup from './util/corUploader.js';
import extractor from './server/lib/extractor.js';
import formatData from './util/formatter.js';
/**
 * handles all the requests and responses
 * of the server 
 */
import express from 'express';
import { logger } from './server/routes/middleware/logger.js';
import { verify, auth } from './server/routes/middleware/google.js';

const app = express();
const router = express.Router();

// API routes
app.use('/api', router); // Mount API routes at '/api' path
app.use((err, req, res, next) => {
 console.log(err);
 res.status(500).send('Something went wrong!');
});

const PORT = 3000;
app.listen(PORT, async () => {
 console.log(`Server is running on http://localhost:${PORT}`);
 await database.connection();
});

// /api/student/
// get self student data

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

//   res.json(student);
//  } catch (error) {
//   res.status(500).send('Internal Server Error');
//  }
// });


// /api/student/setup
// post student certificate of registration logic

// /api/student/delete
// // delete self student data (non cascading)

router.post('/setup', setup.array('files'), async (req, res) => {
 const file = req.files;
 console.log(file); // Log uploaded files information


// middleware to extract student data from cor
const studentData = await extractor.getCorInfo(file[0].path);

// /api/schedule
// // get all schedules

 if (!studentData) {
  return res.status(404).send('Student data not found');
 }

 //  format data to be inserted to database
 const formattedData = formatData(studentData);

// /api/subject
// // get all subjects


 formattedData.studentData.email = 'sample@gmail.com'; //req.user.email  ;

 await Student.upsert(formattedData.studentData);

 res.status(200).json(req.files);
});

// /api/student/delete
// delete self student data (non cascading)
router.delete('/student/delete', async (req, res) => {
 await Student.destroy({
  where: {
   id: req.user.id, // the id of the student to be deleted or EMAIL  req.user.email
  },
 })
  .then(() => {
   console.log('User deleted successfully.');
  })
  .catch((error) => {
   console.error('Error occurred:', error);
  });
});

// /api/schedule
// get all schedules
router.get('/schedule', async (req, res) => {
 try {
  const schedules = await Schedule.findAll();
  res.json(schedules);
 } catch (error) {
  res.status(500).send('Internal Server Error');
 }
});

// /api/subject
// get all subjects
router.get('/subject', async (req, res) => {
 try {
  const subjects = await Subject.findAll();
  res.json(subjects);
 } catch (error) {
  res.status(500).send('Internal Server Error');
 }
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
