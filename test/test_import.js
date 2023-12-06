import Extractor from '../server/lib/extractor.js';
import Student from '../server/db/model/Student.js';
import Subject from '../server/db/model/Subject.js';
import Schedule from '../server/db/model/Schedule.js';
import Room from '../server/db/model/Room.js';
import Faculty from '../server/db/model/Faculty.js';
import Formatter from '../server/lib/formatter.js';

Extractor.getCorInfo('../server/misc/cor2.pdf')
	.then(({ studentData, subjectData }) => {
		const Format = Formatter({ studentData, subjectData });

		async function importData() {
			try {
				const student = await Student.findOrCreate({ where: Format.Student });

				await Promise.all(
					Format.Faculty.map(async (attr) => await Faculty.findOrCreate({ where: attr }))
				);

				await Promise.all(
					Format.Room.map(async (attr) => await Room.findOrCreate({ where: attr }))
				);

				await Promise.all(
					Format.Subject.map(async (attr) => await Subject.findOrCreate({ where: attr }))
				);

				await Promise.all(
					Format.Schedule.map(async (attr) => {
						const subject = await Subject.findOne({
							where: attr.SubjectRef,
							raw: true,
							nest: true,
						});

						const faculty = await Faculty.findOne({
							where: attr.FacultyRef,
							raw: true,
							nest: true,
						});

						const room = await Room.findOne({ where: attr.RoomRef, raw: true, nest: true });

						delete attr.SubjectRef;
						delete attr.FacultyRef;
						delete attr.RoomRef;

						if (subject != null) attr.SubjectId = 1;
						if (faculty != null) attr.FacultyId = 1;
						if (room != null) attr.RoomId = 1;

						await Schedule.findOrCreate({ where: attr, include: [Faculty, Room, Subject] });
					})
				);

				console.log('Import completed successfully.');
			} catch (error) {
				console.error('Error during import:', error);
			}
		}

		importData();
	})
	.catch((error) => console.log(error));

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
