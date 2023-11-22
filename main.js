// import Extractor from "./lib/extractor.js";
// import Logger    from "./lib/logger.js";

import PocketBase from 'pocketbase';

// (self-executing async function)--------------------------------------------------------------------------
(async function() {



   
   



 
    /**
     * authenticate with email and password
     */
    const pb = new PocketBase('http://127.0.0.1:8090');

    const authData = await pb.admins.authWithPassword('email', 'password');

    // after the above you can also access the auth data from the authStore
    console.log(pb.authStore.isValid);
    console.log(pb.authStore.token);
    console.log(pb.authStore.model.id);


    /**
     * create a new record
     */
    const data = {
        "first_name": "joxyle",
        "last_name": "tesst",
        "age": 123,
        "gender": "M",
        "year_level": "1",
        "nationality": "test",
        "department": "CS",
        "college": "CITC",
        "email": "test@example.com",
        "contact_no": "9353787332"
    };

    const record = await pb.collection('Student').create(data);


    /**
     * list all records
     */
    // you can also fetch all records at once via getFullList
    const records = await pb.collection('Student').getFullList({
        sort: '-created',
    });

    console.log(records);


    // "logout" the last authenticated account
    pb.authStore.clear();
















    // const logger = Logger('./log/main.log')


    // // extracts the info from the pdf file
    // try {

    //     // TODO: integrate website to the extractor
    //     const output    = await Extractor.getCorInfo("./misc/cor.pdf");
    //     const structure = JSON.stringify(output, null, 4);
    //     console.log(structure);
    // } 
    // catch (error) {

    //     // TODO: add error handling and logging when COR extraction fails
    //     logger.append('');
    //     logger.append(error, 'ERROR');
    // }
    

    // // puts the info to the database
    // try {
        
    //     // TODO: template for inserting data to the database
    //     const st = {
    //         first_name: 'Joxyle',
    //         last_name: 'Omblero',
    //         age: 21,
    //         gender: 'L',
    //         year_level: '2',
    //         nationality: 'Filipino',
    //         department: 'IT',
    //         email: 'minecraft@email.com',
    //         middle_initial: 'b',
    //         contact_no: '9353787332',
    //     };

    //     // create or update (constrained by unique attributes)
    //     const [student, isCreated] = await Student.upsert(st);

    //     (isCreated) 
    //         ? console.log('Student created:', student.toJSON())
    //         : console.log('Student updated:', student.toJSON());

    //     await synchronize();
    // } 
    // catch (error) {
    //     // TODO: add error handling and logging when database sync fails
    //     console.error('Error creating or updating student:', error.message);
    // }

})();