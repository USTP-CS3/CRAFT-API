const toTitleCase = phrase => {
	// Remove titles like Mr., Ms., Dr., Engr, Eng from the beginning of the name
	let nameNoTitle = phrase.replace(/^(mr\.|ms\.|dr\.|engr|eng)\s+/i, '');

	return nameNoTitle
		.toLowerCase()
		.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')
		.replace(/ +/g, ' ');
};

function convertTo24HourFormat(timeString) {
	const [time, period] = timeString.split(' ');
	let [hours, minutes] = time.split(':');

	hours = period === 'PM' && hours < 12 ? parseInt(hours, 10) + 12 : parseInt(hours, 10) % 12;

	return `${hours.toString().padStart(2, '0')}:${minutes}`;
}

function removeDuplicateObjects(array) {
	const uniqueObjects = [];
	const seenObjects = new Set();

	for (const obj of array) {
		// Convert the object to a string for easy comparison
		const stringifiedObject = JSON.stringify(obj);

		// Check if we have seen this object before
		if (!seenObjects.has(stringifiedObject)) {
			// Add the object to the result array
			uniqueObjects.push(obj);
			// Mark the object as seen
			seenObjects.add(stringifiedObject);
		}
	}

	return uniqueObjects;
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

	const yearLevelFormat = yearLevel => {
		const year = yearLevel.split(' ')[0];
		return format[year];
	};

	const semYearFormat = semYear => {
		const semester = semYear.split(' ')[0];
		const year = semYear.split(' ').at(-1).split('-')[0];

		return {
			semester: format[semester],
			year: year,
		};
	};

	const { semester, year } = semYearFormat(studentData.academic_year);

	const Student = {
		attribute: {
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
		},
		associate: {},
	};

	let Schedule = [];

	subjectData.forEach(subj => {
		const subject = {
			course_code: subj.code,
			description: subj.subject,
			lecture_units: subj.lecture,
			lab_units: subj.laboratory,
		};

		subj.schedule.forEach(sched => {
			const faculty = {
				name: toTitleCase(sched.instructor),
			};

			const room = {
				description: sched.room == '' ? null : sched.room,
			};

			const schedule = {
				attribute: {
					section: 'C2SC',
					start_time: convertTo24HourFormat(sched.timeStart),
					end_time: convertTo24HourFormat(sched.timeEnd),
					day: sched.weekday,
					semester: semester,
					year: year,
				},
				associate: {
					Subject: subject,
					Faculty: faculty,
					Room: room,
				},
			};

			Schedule.push(schedule);
		});
	});

	const Format = { Student, Schedule, removeDuplicateObjects };
	return Format;
};

export default Formatter;
