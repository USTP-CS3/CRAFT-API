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