/**
 *
 * Custom made to extract data from the Certificate of Registration (COR)
 * of the University of Science and Technology of Southern Philippines.
 *
 * It is used as a middleware in the server.js file.
 *
 */

import PDFParser from 'pdf2json';
import Formatter from './formatter.js';

// -------------------------------------------------------------------------------------------------

/**
 * Extracts data of student and schedule from the Certificate of Registration.
 *
 * @param   {string | Buffer} pdf - The file path of the Certificate of Registration in PDF format.
 * @returns {Promise<{ studentData: JSON, subjectData: JSON }>} A promise that resolves with student and subject data.
 * @throws  {PdfParserError} Thrown if there is an error during PDF parsing.
 * @throws  {InvalidFormatError} Thrown if the COR file is not in the correct format.
 * @throws  {Error} Thrown for any other unexpected errors.
 */
async function getCorInformation(pdf) {
	/**
	 * Retrieves information from a Certificate of Registration (COR) PDF file.
	 *
	 * @param   {string | Buffer} pdf - The file path of the Certificate of Registration in PDF format.
	 * @returns {Promise<{ studentData: JSON, subjectData: JSON }>} A promise that resolves with student and subject data.
	 * @throws  {PdfParserError} Thrown if there is an error during PDF parsing.
	 * @throws  {InvalidFormatError} Thrown if the COR file is not in the correct format.
	 * @throws  {Error} Thrown for any other unexpected errors.
	 * @private
	 */
	const _getCorInfo = pdf => {
		return new Promise((resolve, reject) => {
			const pdfParser = new PDFParser();

			// check if its a string then its a path
			if (typeof pdf == 'string') {
				pdfParser.loadPDF(pdf);
			}
			// check if not, then its a buffer
			else {
				pdfParser.parseBuffer(pdf);
			}

			pdfParser.on('pdfParser_dataError', dataError => {
				reject({
					name: 'PdfParserError',
					message: 'An error occured when parsing the pdf file.',
				});
			});

			pdfParser.on('pdfParser_dataReady', dataReady => {
				try {
					const data = _getPdfTextArray(dataReady);
					const studentData = _getStudentData(data);
					const scheduleData = _getScheduleData(data);
					resolve({
						studentData,
						scheduleData,
					});
				} catch (dataError) {
					console.log(dataError);
					reject({
						name: 'InvalidFormatError',
						message: 'The Certificate of Registration is not in the correct format.',
					});
				}
			});
		});
	};

	/**
	 * Extracts text data from the first page of a PDF.
	 *
	 * @param {JSON} pdfData - The raw data of the PDF file.
	 * @returns {Array<string>} An array of text extracted from the PDF.
	 * @private
	 */
	const _getPdfTextArray = pdfData => {
		// select only first page text
		const pageObject = pdfData['Pages'][0]['Texts'];

		// iterate text object and append to text array
		const data = [];

		let customIndex = 0;
		for (const [fixedIndex, textObject] of pageObject.entries()) {
			const text = decodeURIComponent(textObject['R'][0]['T']);

			// TODO: if there's address, see if it offsets the index
			// if no scholarship or contact, push 'N/A' to the array
			if (
				(customIndex == 26 && text.replaceAll(' ', '') == 'Contact#:') ||
				(customIndex == 31 && text.replaceAll(' ', '') == 'UNIT')
			) {
				data.push('N/A');
				// console.log(customIndex, 'N/A');
				customIndex++; // customIndex will be 27
			}

			data.push(text);
			// console.log(customIndex, text);
			customIndex++;
		}

		return data;
	};

	/**
	 * Extracts student data from the pdf data and returns an object in json format
	 *
	 * @param {Array<string>} data Maps the text array to its corresponding key
	 * @returns {JSON} containing student data
	 * @private
	 */
	const _getStudentData = data => {
		// C E R T I F I C A T E  O F  R E G I S T R A T I O N
		// => CERTIFICATE OF REGISTRATION
		const document_title = data[0]
			.split('  ')
			.map(word => word.replaceAll(' ', ''))
			.join(' ');

		if (document_title != 'CERTIFICATE OF REGISTRATION') {
			throw new Error('Not a COR');
		}

		return {
			// index <= 31 is student data
			document_title,
			name: data[17],
			year_level: data[23],
			campus: data[1],
			registration_no: data[15],
			id: data[16],
			gender: data[18],
			age: data[19],
			college: data[20],
			department: data[21],
			major: data[22],
			curriculum: data[24],
			academic_year: data[25],
			scholarship: data[26],
			nationality: data[30],
			contact: data[31],
			// index >= 39 is schedules data
		};
	};

	/**
	 * Extracts schedule data from the given text data and returns an array of objects in JSON format.
	 *
	 * @param {Array<string>} data - An array of strings representing the text data.
	 * @returns {Array<JSON>} An array of objects containing schedule data.
	 * @private
	 */
	const _getScheduleData = data => {
		const schedules = [];

		const patternOfSchedule =
			/(^(S|M|T|W|Th|F)*(\s\d\d?:\d\d\s(AM|PM)))\s-(\s\d\d?:\d\d\s(AM|PM))/g;
		const patternOfWeekday = /^(S|M|Th|T|W|F)*/g;
		const patternOfTime = /\d\d?:\d\d\s(AM|PM)/g;

		const _parseSchedule = scheduleString => {
			const schedule = scheduleString.match(patternOfSchedule)[0];
			const room = scheduleString.replace(schedule, '').trim();
			const mixedDays = schedule.match(patternOfWeekday)[0];
			const start_time = schedule.match(patternOfTime)[0];
			const end_time = schedule.match(patternOfTime)[1];
			const weekdays = [];

			for (let j = 0; j < mixedDays.length; j++) {
				if (mixedDays[j] == 'T' && mixedDays[j + 1] == 'h') {
					weekdays.push('Th');
					j++;
					continue;
				}
				weekdays.push(mixedDays[j]);
			}

			return { room, weekdays, start_time, end_time };
		};

		const indexOfBreak = data.indexOf('Total Unit(s)');

		for (let i = 39; i < indexOfBreak; i += 8) {
			// check if we moved on to another subject in the list of schedules
			// but we overthrowed and the current index is still a schedule,
			// so we add the current index to the previous subject's schedule

			const isScheduleOfPreviousSchedule = data[i].match(patternOfSchedule);

			if (isScheduleOfPreviousSchedule) {
				// schedule is dependent on the number of days
				const { room, weekdays, start_time, end_time } = _parseSchedule(data[i]);

				let previousSchedule = schedules.at(-1);

				weekdays.forEach(day => {
					previousSchedule.schedule.push({
						day: day,
						room: room,
						instructor: Formatter.getFullName(data[i + 1]),
						start_time: Formatter.to24HourFormat(start_time),
						end_time: Formatter.to24HourFormat(end_time),
					});
				});

				i -= 6; // proceed to the next iteration
			} else {
				// schedule is dependent on the number of days
				const { room, weekdays, start_time, end_time } = _parseSchedule(data[i + 5]);

				let subject = {
					subject: data[i + 1],
					lecture: data[i + 2],
					laboratory: data[i + 3],
					credit: data[i + 4],
					code: data[i + 6],
					section: data[i + 7],
					schedule: [],
				};

				weekdays.forEach(day => {
					subject.schedule.push({
						day: day,
						room: room,
						instructor: Formatter.getFullName(data[i]),
						start_time: Formatter.to24HourFormat(start_time),
						end_time: Formatter.to24HourFormat(end_time),
					});
				});

				schedules.push(subject);
			}
		}

		return schedules;
	};

	return await _getCorInfo(pdf);
}

/**
 * Formats the getCorInfo() into a relation object that matches that of a SQL
 *
 * @param {JSON} object containing student and schedule data from getCorInfo()
 * @returns {JSON} containing {attributes, associate} of student and schedule
 */
function formatCorRelation({ studentData, scheduleData }) {
	const { first_name, last_name, middle_initial } = Formatter.getSplitName(studentData.name);

	const Student = {
		attribute: {
			id: studentData.id,
			last_name: last_name,
			first_name: first_name,
			middle_initial: middle_initial,
			year_level: Formatter.yearLevelFormat(studentData.year_level),
			department: Formatter.courseFormat(studentData.department),
			college: Formatter.collegeFormat(studentData.college),
			nationality: studentData.nationality,
			auth_name: 'accountData.name',
			email: 'accountData.email',
			gender: studentData.gender,
			age: studentData.age,
		},
		associate: {},
	};

	let Schedule = [];
	const { semester, year } = Formatter.semesterYearFormat(studentData.academic_year);

	scheduleData.forEach(subj => {
		const subject = {
			course_code: subj.code,
			description: subj.subject,
			lecture_units: subj.lecture,
			lab_units: subj.laboratory,
		};

		subj.schedule.forEach(sched => {
			const faculty = {
				name: sched.instructor,
			};

			const room = {
				description: sched.room == '' ? null : sched.room,
			};

			const schedule = {
				attribute: {
					section: subj.section,
					start_time: sched.start_time,
					end_time: sched.end_time,
					day: sched.day,
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

	return { Student, Schedule };
}

// Extractor Class-------------------------------------------------------------------------------------------------

const Extractor = {
	getCorInformation,
	formatCorRelation,
};

export default Extractor;
