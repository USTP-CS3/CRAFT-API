import Extractor from '../server/lib/extractor.js';
import Student from '../server/db/model/Student.js';
import Subject from '../server/db/model/Subject.js';
import Schedule from '../server/db/model/Schedule.js';
import Room from '../server/db/model/Room.js';
import Faculty from '../server/db/model/Faculty.js';
import Formatter from '../server/lib/formatter.js';
import Database from '../server/db/database.js';

Extractor.getCorInformation('../server/misc/cor2.pdf').then(({ studentData, scheduleData }) => {
	Student.belongsToMany(Schedule, { through: 'StudentSchedule' });
	Schedule.belongsToMany(Student, { through: 'StudentSchedule' });
	// Student.hasMany(Request);
	// Request.belongsTo(Student);
	Subject.hasMany(Schedule);
	Schedule.belongsTo(Subject);
	Faculty.hasMany(Schedule);
	Schedule.belongsTo(Faculty);
	Room.hasMany(Schedule);
	Schedule.belongsTo(Room);

	let Relation = Extractor.formatCorRelation({ studentData, scheduleData });

	Database.session
		.sync({ force: true })
		/**
		 * Create or find ID's of Subject, Faculty, and Room
		 */
		.then(session => {
			const subjects = Formatter.removeDuplicateObjects(
				Relation.Schedule.map(schedule => schedule.associate.Subject)
			);
			const facultys = Formatter.removeDuplicateObjects(
				Relation.Schedule.map(schedule => schedule.associate.Faculty)
			);
			const rooms = Formatter.removeDuplicateObjects(
				Relation.Schedule.map(schedule => schedule.associate.Room)
				// some schedules have no rooms, so we remove them if null
			).filter(room => room.description != null);

			return Promise.all([
				Subject.bulkCreate(subjects, { ignoreDuplicates: true, returning: true }),
				Faculty.bulkCreate(facultys, { ignoreDuplicates: true, returning: true }),
				Room.bulkCreate(rooms, { ignoreDuplicates: true, returning: true }),
			]);
		})
		/**
		 * Create the student instance
		 * Create or find schedules then assign the ID's of Subject, Faculty, and Room
		 * Schedule's RoomId is nullable, so we check if the room is null or not
		 */
		.then(promises => {
			const [subjects, facultys, rooms] = promises;

			const schedules = Relation.Schedule.map(schedule => {
				// assign the id of subject to schedule attribute
				const subject = subjects.find(
					subject => subject.course_code == schedule.associate.Subject.course_code
				);
				schedule.attribute.SubjectId = subject.id;

				// assign the id of faculty to schedule attribute
				const faculty = facultys.find(
					faculty => faculty.name == schedule.associate.Faculty.name
				);
				schedule.attribute.FacultyId = faculty.id;

				// if schedule's room is not null, assign its id attribute
				if (schedule.associate.Room.description != null) {
					const room = rooms.find(
						room => room.description == schedule.associate.Room.description
					);
					schedule.attribute.RoomId = room.id;
				}

				return schedule.attribute;
			});

			return Promise.all([
				Student.create(Relation.Student.attribute),
				Schedule.bulkCreate(schedules, { ignoreDuplicates: true, returning: true }),
			]);
		})
		/**
		 * Assign the schedules to student
		 */
		.then(promises => {
			const [student, schedules] = promises;
			return student.setSchedules(schedules);
		})
		.catch(console.error);
});
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
