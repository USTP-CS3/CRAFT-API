<<<<<<< HEAD
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { getCorInfo } from './lib/extractor.js';
import fs from 'fs';
import path from 'path';

// lib interlinked for debugging purposes 
// import Database from "./lib/database.js";
// import Scheduler from "./lib/scheduler.js";

/**
 * Logs a message to a file.
 * 
 * @param {string} message - The message to be logged.
 * @param {string} [filename=log-datetime.log] - The name of the log file. Defaults to 'log-datetime.log'.
 * @returns {void}
 * @throws {Error} Throws an error if there is an issue writing to the log file.
 */

export function logToFile(message, filename = 'log-datetime.log') {
    const currentFilePath = fileURLToPath(import.meta.url);

    const logDirectory = path.join(dirname(currentFilePath), 'log');

    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory);
=======
import { synchronize } from './db/database.js';

import Student  from './db/model/Student.js';
import Subject  from './db/model/Subject.js';
import Schedule from './db/model/Schedule.js';
import Room     from './db/model/Room.js';
import Faculty  from './db/model/Faculty.js';

import Extractor from "./lib/extractor.js";
import Logger    from "./lib/logger.js";

// (self-executing async function)--------------------------------------------------------------------------
(async function main() {

    const logger = Logger('./log/main.log')


    // extracts the info from the pdf file
    try {

        // TODO: integrate website to the extractor
        const output    = await Extractor.getCorInfo("./misc/cor.pdf");
        const structure = JSON.stringify(output, null, 4);
        console.log(structure);
    } 
    catch (error) {

        // TODO: add error handling and logging when COR extraction fails
        logger.append('');
        logger.append(error, 'ERROR');
    }
    

    // puts the info to the database
    try {
        
        // TODO: template for inserting data to the database
        const st = {
            first_name: 'Joxyle',
            last_name: 'Omblero',
            age: 21,
            gender: 'L',
            year_level: '2',
            nationality: 'Filipino',
            department: 'IT',
            email: 'minecraft@email.com',
            middle_initial: 'b',
            contact_no: '9353787332',
        };

        // create or update (constrained by unique attributes)
        const [student, isCreated] = await Student.upsert(st);

        (isCreated) 
            ? console.log('Student created:', student.toJSON())
            : console.log('Student updated:', student.toJSON());

        await synchronize();
    } 
    catch (error) {
        // TODO: add error handling and logging when database sync fails
        console.error('Error creating or updating student:', error.message);
>>>>>>> origin/main
    }

    const logFilePath = path.join(logDirectory, filename);

    fs.appendFileSync(logFilePath, `${message}\n`);
}


/**
 * Main function to process the COR file, log the success or error.
 * 
 * @returns {void}
 */

(async function main() {
    const filePath = './misc/cor3.pdf';

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        const errorMessage = `Datetime: ${new Date().toISOString()}\nError: File does not exist`;
        const logId = Math.floor(Math.random() * 1000);
        logToFile(`${errorMessage}\nError Log ID: ${logId}`);
        return;
    }

    // Check if the file extension is '.pdf'
    if (!filePath.toLowerCase().endsWith('.pdf')) {
        const errorMessage = `Datetime: ${new Date().toISOString()}\nError: File is not a PDF`;
        const logId = Math.floor(Math.random() * 1000);
        logToFile(`${errorMessage}\nError Log ID: ${logId}`);
        return; 
    }

    try {
        const output = await getCorInfo(filePath);

        // Check if the document title ends with 'CERTIFICATEOFREGISTRATION'
        if (output && output.studentData && output.studentData.document_title === 'CERTIFICATEOFREGISTRATION') {
            const structure = JSON.stringify(output, null, 4);
            console.log(structure);
            const successMessage = `Datetime: ${new Date().toISOString()}\nSuccess: ${structure}`;
            logToFile(successMessage);
        } else {
            const errorMessage = `Datetime: ${new Date().toISOString()}\nError: Invalid document title`;
            const logId = Math.floor(Math.random() * 1000);
            logToFile(`${errorMessage}\nError Log ID: ${logId}`);
        }
    } catch (error) {
        const errorMessage = `Datetime: ${new Date().toISOString()}\nError: ${error.message}`;
        const logId = Math.floor(Math.random() * 1000);
        logToFile(`${errorMessage}\nError Log ID: ${logId}`);
    }
})();


/* left for debugging purpose
// change with MySQL user credentials
const dbConfig = {
  host: 'localhost',
  user: 'your_test_user',
  password: 'your_test_password',
  database: 'test_database',
};
const yourDatabaseInstance = new Database(dbConfig);
const scheduler = new Scheduler(yourDatabaseInstance);
scheduler.displayFrequency()
  .then(() => yourDatabaseInstance.close())
  .catch((error) => console.error(`Error: ${error.message}`));
*/