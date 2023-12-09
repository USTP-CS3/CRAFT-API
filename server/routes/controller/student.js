import Student from '../../db/model/Student.js';
import Schedule from '../../db/model/Schedule.js';
import Subject from '../../db/model/Subject.js';
import Faculty from '../../db/model/Faculty.js';
import Room from '../../db/model/Room.js';
import Database from '../../db/database.js';
import Extractor from '../../lib/extractor.js';

const reject = (message, corData = {}) => {
	req.craft.message = message + error.message;
	req.craft.package = corData;
	res.status(500).json(req.craft);
};

const accept = (message, corData = {}) => {
	req.craft.message = message;
	req.craft.package = corData;
	res.status(200).json(req.craft);
};

/**
 * @requires has_self_data middleware
 * @returns studentData of the account
 *
 */
function get_self_data(req, res) {
	res.json(req.craft);
	return;
}

// the email of the user is the key of temp_cor_extract object
let temp_cor_extract = {};

/**
 * @requires Uploaded multer middleware for uploaded file should be defined before this is used
 * @requires has_empty_data middleware to check if the student has no data
 *  Extracts the data from the uploaded pdf and temporarily stores it
 * to temp_cor_extract object until the user agreed on the next request
 */
function post_extract_corpdf(req, res) {
	// Access the uploaded file from req.file
	const corPdf = req.file.buffer;

	Extractor.getCorInfo(corPdf)
		.then(corData => {
			// corData = { studentData, scheduleData }
			// req.craft.account is created from the google middleware
			corPdf.accountData = {
				email: req.craft.account.email,
				auth_name: req.craft.account.name,
			};

			// if document is not a Certificate of Registration, throw an error
			if (studentData.document_title != 'CERTIFICATE OF REGISTRATION') {
				reject('Not A COR');
				return;
			} else if (
				/**
				 * if college is not CITC or campus is not USTP CDO,
				 * response with unsupported message
				 */
				studentData.campus != 'USTP CDO CAMPUS' ||
				studentData.college != 'COLLEGE OF INFORMATION TECHNOLOGY AND COMPUTING'
			) {
				// TODO: save the file to misc/extract_unsupported folder
				reject('Unsupported College', corData);
				return;
			}

			// if college is CITC, respond with a success message
			else if (studentData.college == 'COLLEGE OF INFORMATION TECHNOLOGY AND COMPUTING') {
				// temporarily store the file and corData with email as key
				temp_cor_extract[req.craft.account.email] = {
					file: corPdf,
					corData: corData,
				};
				accept('Extract Success', corData);
				return;
			}
		})
		.catch(error => {
			// TODO: save the file to misc/extract_failed folder for debugging
			reject('Extract Failed');
			return;
		});
}

function post_import_corpdf(req, res) {
	// TODO: get the file and data from temp_cor_extract based on req.craft.account.email
	// save the file to misc and import the data to the database
	// if error, save the file to misc/failed_import folder

	const { file, corData } = temp_cor_extract[req.craft.account.email];

	Student.belongsToMany(Schedule, { through: 'StudentSchedule' });
	Schedule.belongsToMany(Student, { through: 'StudentSchedule' });
	Subject.hasMany(Schedule);
	Schedule.belongsTo(Subject);
	Faculty.hasMany(Schedule);
	Schedule.belongsTo(Faculty);
	Room.hasMany(Schedule);
	Schedule.belongsTo(Room);
	// Student.hasMany(Request);
	// Request.belongsTo(Student);

	let Relation = Extractor.formatCorRelation(corData);

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
		// TODO: save the file to misc/imported folder
		.then(() => {
			delete temp_cor_extract[req.craft.account.email];
			accept('Import Success', corData);
			return;
		})
		.catch(() => {
			delete temp_cor_extract[req.craft.account.email];
			reject('Import Failed', corData);
			return;
		});
}

const StudentController = { get_self_data, post_extract_corpdf, post_import_corpdf };
export { StudentController };
