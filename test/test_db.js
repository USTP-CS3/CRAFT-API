import Student from "../server/db/model/Student.js";


/**
 * Create a new student in the database
 */
const st = {
    first_name: 'Joeninyo',
    last_name: 'Cainday',
    auth_name: 'mihkuno',
    age: 21,
    gender: 'M',
    year_level: '2',
    nationality: 'Filipino',
    department: 'IT',
    email: 'caindayjoeninyo@gmail.com',
    middle_initial: 'b',
    contact_no: '9353787332',
};

// upsert means to update if it exists or create if it doesn't
Student.upsert(st).then(([student, isCreated]) => { 

    (isCreated) 
        ? console.log('Student created:', student.toJSON())
        : console.log('Student updated:', student.toJSON());

}).catch(error => { console.log(error) });



/**
 * Find the student with the given email
 */
Student.findOne({ where: { email: 'caindayjoenidnyo@gmail.com' }, raw: true, nest: true })
  .then(student => {
    if (student != undefined) {
      console.log(student.id);
    }
    else console.log('Student not found');
  })
  .catch(error => {
    console.log(error);
  })


  