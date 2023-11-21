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
    }

})();