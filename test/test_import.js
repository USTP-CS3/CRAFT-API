import Extractor from '../server/lib/extractor.js';
import Student from '../server/db/model/Student.js';
import Subject from '../server/db/model/Subject.js';
import Schedule from '../server/db/model/Schedule.js';
import Room from '../server/db/model/Room.js';
import Faculty from '../server/db/model/Faculty.js';
import Formatter from '../server/lib/formatter.js';
import Database from '../server/db/database.js';

Extractor.getCorInfo('../server/misc/cor2.pdf').then(({ studentData, subjectData }) => {
	const Format = Formatter({ studentData, subjectData });

	// Student.belongsToMany(Schedule, { through: 'StudentSchedule' });
	// Schedule.belongsToMany(Student, { through: 'StudentSchedule' });
	// Student.hasMany(Request);
	// Request.belongsTo(Student);
	Subject.hasMany(Schedule);
	Schedule.belongsTo(Subject);
	Faculty.hasMany(Schedule);
	Schedule.belongsTo(Faculty);
	Room.hasMany(Schedule);
	Schedule.belongsTo(Room);

	// const student = Student.findOrCreate({ where: Format.Student.attribute });

	Database.session
		.sync({ force: true })
		// insert subject, faculty, room
		.then(result => {
			return Promise.all([
				Subject.bulkCreate(
					Format.Schedule.map(schedule => schedule.associate.Subject),
					{ ignoreDuplicates: true, returning: ['id'] }
				),

				Faculty.bulkCreate(
					Format.Schedule.map(schedule => schedule.associate.Faculty),
					{ ignoreDuplicates: true, returning: ['id'] }
				),
				Room.bulkCreate(
					Format.Schedule.map(schedule => schedule.associate.Room),
					{ ignoreDuplicates: true, returning: ['id'] }
				),
			]);
		})
		.then(promises => {
			promises.forEach(promise => {
				console.log(promise);
				// promise.forEach(result => {
				// 	console.log(result);
				// });
			});

			// get schedule foreign keys by finding or creating the associated models
			// return Promise.all(
			// Format.Schedule.map(async schedule => {
			// const subject = await Subject.findOne({
			// 	where: schedule.associate.Subject,
			// })[0]; // [instance, isCreated]

			// const faculty = await Faculty.findOne({
			// 	where: schedule.associate.Faculty,
			// })[0]; // [instance, isCreated]

			// const room =
			// 	schedule.associate.Room.description !== null
			// 		? await Room.findOne({
			// 				where: schedule.associate.Room,
			// 		  })[0] // [instance, isCreated]
			// 		: null;

			// return {
			// 	attributes: schedule.attribute,
			// 	relations: { subject, faculty, room },
			// };
			// })
			// );
		})
		// .then(schedules => {
		// 	return Promise.all(
		// 		schedules.map(async schedule => {
		// 			const { subject, faculty, room } = schedule.relations;

		// 			if (room) schedule.attributes.roomId = room.id;
		// 			schedule.attributes.SubjectId = subject.id;
		// 			schedule.attributes.FacultyId = faculty.id;

		// 			return await Schedule.findOrCreate({ where: schedule.attributes });
		// 		})
		// 	);
		// })
		// .then(createdSchedules => {
		// 	// Handle the result if needed
		// })
		.catch(error => {
			// Handle errors
			console.error(error);
		});

	// Database.session
	// 	.sync()
	// 	.then(function () {
	// 		const room = Room.findOrCreate({ where: { description: 'Room 2' } });
	// 		const faculty = Faculty.findOrCreate({ where: { name: 'Joe Landicho' } });
	// 		const subject = Subject.findOrCreate({
	// 			where: {
	// 				course_code: 'CS3 101',
	// 				description: 'Introduction to Computer Networks',
	// 				lecture_units: 3,
	// 				lab_units: 1,
	// 			},
	// 		});
	// 		return Promise.all([room, subject, faculty]);
	// 	})
	// 	.then(function ([room, subject, faculty]) {
	// 		const [room, isNewRoom] = room;
	// 		const [subject, isNewSubject] = subject;
	// 		const [faculty, isNewFaculty] = faculty;

	// 		return Schedule.findOrCreate({
	// 			where: {
	// 				section: 'A',
	// 				start_time: '07:00:00',
	// 				end_time: '08:00:00',
	// 				day: 'W',
	// 				semester: '1',
	// 				year: '2020',
	// 				SubjectId: subject.id,
	// 				FacultyId: faculty.id,
	// 				RoomId: room.id,
	// 			},
	// 		});
	// 	})
	// 	.then((schedule) => {
	// 		Student.addSchedule(schedule);

	// 		console.log('Database synced and records created successfully.');
	// 	})
	// 	.catch((err) => {
	// 		console.error('Error syncing database and creating records:', err);
	// 	});

	//
});
// .catch(error => console.log(error));

/**

studentData: {
  document_title: 'CERTIFICATEOFREGISTRATION',
  campus: 'USTP CDO CAMPUS',
  registration_no: '396059',
  id: '2022307166',
  first_name: ' Joeniño D',
  last_name: 'CAINDAY',
  middle_initial: 'D',
  gender: 'M',
  age: '20',
  college: 'COLLEGE OF INFORMATION TECHNOLOGY AND COMPUTING',
  department: 'B.S. in Computer Science',
  major: 'N/A',
  year_level: '2nd Year - Baccalaureate',
  curriculum: 'BSCS-SY:2022-2023',
  academic_year: '1st Semester AY 2023-2024',
  scholarship: 'uniFast Scholar',
  nationality: 'Filipino',
  contact: '0'
}

subjectData: 
[
  {
    subject: 'Environmental Science',
    lecture: '3',
    laboratory: '0',
    credit: '3',
    code: 'EnviSci',
    section: 'CS2C',
    schedule: [ [Object], [Object] ]
  },
  {
    subject: 'Physical Activity Towards Health and Fitness 1',
    lecture: '2',
    laboratory: '0',
    credit: '2',
    code: 'PATH FIT 3',
    section: 'CS2C',
    schedule: [ [Object] ]
  },
  {
    subject: 'Life and Works of Rizal',
    lecture: '3',
    laboratory: '0',
    credit: '3',
    code: 'Rizal',
    section: 'CS2C',
    schedule: [ [Object], [Object] ]
  },
  {
    subject: 'Discrete Structures 1',
    lecture: '3',
    laboratory: '0',
    credit: '3',
    code: 'CS211',
    section: 'CS2C',
    schedule: [ [Object] ]
  },
  {
    subject: 'Human Computer Interaction',
    lecture: '2',
    laboratory: '1',
    credit: '3',
    code: 'CS212',
    section: 'CS2C',
    schedule: [ [Object], [Object] ]
  },
  {
    subject: 'Data Structures and Algorithms (Algo 1)',
    lecture: '2',
    laboratory: '1',
    credit: '3',
    code: 'CS213',
    section: 'CS2C',
    schedule: [ [Object], [Object] ]
  },
  {
    subject: 'Fundamentals of Database Systems',
    lecture: '2',
    laboratory: '1',
    credit: '3',
    code: 'CS214',
    section: 'CS2C',
    schedule: [ [Object], [Object] ]
  },
  {
    subject: 'Statistics for Computer Science',
    lecture: '2',
    laboratory: '1',
    credit: '3',
    code: 'CSMath211',
    section: 'CS2C',
    schedule: [ [Object], [Object] ]
  }
]

*/
