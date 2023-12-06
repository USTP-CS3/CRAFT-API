const toTitleCase = (phrase) => {
	// Remove titles like Mr., Ms., Dr., Engr, Eng from the beginning of the name
	let nameNoTitle = phrase.replace(/^(mr\.|ms\.|dr\.|engr|eng)\s+/i, '');

	return nameNoTitle
		.toLowerCase()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')
		.replace(/ +/g, ' ');
};

function convertTo24HourFormat(timeString) {
	const [time, period] = timeString.split(' ');
	let [hours, minutes] = time.split(':');

	hours = period === 'PM' && hours < 12 ? parseInt(hours, 10) + 12 : parseInt(hours, 10) % 12;

	return `${hours.toString().padStart(2, '0')}:${minutes}`;
}

const Formatter = ({ studentData, subjectData }) => {
	const courseFormat = {
		'B.S. in Data Science': 'DS',
		'B.S. in Computer Science': 'CS',
		'B.S. in Information Technology': 'IT',
		'B.S. in Technology Communication Management': 'TCM',
	};

	const collegeFormat = {
		'COLLEGE OF INFORMATION TECHNOLOGY AND COMPUTING': 'CITC',
	};

	const format = {
		'1st': '1',
		'2nd': '2',
		'3rd': '3',
		'4th': '4',
		'5th': '5',
	};

	const yearLevelFormat = (yearLevel) => {
		const year = yearLevel.split(' ')[0];
		return format[year];
	};

	const semYearFormat = (semYear) => {
		const semester = semYear.split(' ')[0];
		const year = semYear.split(' ').at(-1).split('-')[0];

		return {
			semester: format[semester],
			year: year,
		};
	};

	const { semester, year } = semYearFormat(studentData.academic_year);

	let Schedule = [];
	let Faculty = [];
	let Subject = [];
	let Room = [];

	subjectData.forEach((subj) => {
		const subject = {
			course_code: subj.code,
			description: subj.subject,
			lecture_units: subj.lecture,
			lab_units: subj.laboratory,
		};
		Subject.push(subject);

		subj.schedule.forEach((sched) => {
			const faculty = {
				name: toTitleCase(sched.instructor),
			};

			const room = {
				description: sched.room,
			};

			const schedule = {
				section: subj.section,
				start_time: convertTo24HourFormat(sched.timeStart),
				end_time: convertTo24HourFormat(sched.timeEnd),
				day: sched.weekday,
				semester: semester,
				year: year,
				SubjectRef: subject,
				FacultyRef: faculty,
				RoomRef: room.name == '' ? null : room,
			};

			Schedule.push(schedule);
			Faculty.push(faculty);

			if (room.description != '') Room.push(room);
		});
	});

	const Student = {
		first_name: toTitleCase(studentData.first_name.trim()),
		last_name: toTitleCase(studentData.last_name),
		auth_name: 'google_name_here',
		age: studentData.age,
		gender: studentData.gender,
		year_level: yearLevelFormat(studentData.year_level),
		nationality: studentData.nationality,
		department: courseFormat[studentData.department],
		email: 'google_email_here',
		middle_initial: studentData.middle_initial,
		contact_no: studentData.contact,
	};

	const Format = { Student, Schedule, Faculty, Subject, Room };
	return Format;
};

export default Formatter;
