/**
 * Convert the course into its acronym
 * @param {string} course convert from ex. B.S. in ... => IT
 */
function courseFormat(course) {
	const format = {
		'B.S. in Data Science': 'DS',
		'B.S. in Computer Science': 'CS',
		'B.S. in Information Technology': 'IT',
		'B.S. in Technology Communication Management': 'TCM',
	};
	return format[course];
}

/**
 * Convert the college into its acronym
 * @param {string} college convert from COLLEGE OF ... => CITC
 */
function collegeFormat(college) {
	const format = {
		'COLLEGE OF INFORMATION TECHNOLOGY AND COMPUTING': 'CITC',
	};
	return format[college];
}

/**
 * Convert a rank format into a single number
 * @param {string} rank convert from 1st => 1
 * @return {string} number
 */

function rankFormat(rank) {
	const format = {
		'1st': '1',
		'2nd': '2',
		'3rd': '3',
		'4th': '4',
		'5th': '5',
	};
	return format[rank];
}
/**
 * Remove titles like Mr., Ms., Dr., Engr, Eng from the beginning of the name
 * @param {string} name
 * @return {string} name without title
 */
function removeNameTitle(name) {
	return name.replace(/^(mr\.|ms\.|dr\.|engr|eng)\s+/i, '');
}

/**
 * Makes every first letter of a word in a sentence upper case
 * @param {string} phrase
 * @returns {string} title case phrase
 */
function toTitleCase(phrase) {
	return phrase
		.toLowerCase()
		.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')
		.replace(/ +/g, ' ')
		.trim();
}

/**
 * @param {string} name
 * @returns {string} full name in title case and without name title
 * To title case and remove name title
 */
function getFullName(name) {
	return toTitleCase(removeNameTitle(name));
}

/**
 * Splits the name string into first, last, and middle name
 *
 * @param {string} name the full name
 * @returns {object} splitted name
 */
function getSplitName(name) {
	const title_case = getFullName(name);
	const split_name = title_case.split(' ');

	let last_name = '';
	let first_name = '';
	let middle_initial = '';

	// check if the last name is first in the array
	// it probably has a comma
	if (split_name[0].at(-1) == ',') {
		// shift affect the original array ang returns the first element
		last_name = split_name.shift().slice(0, -1);
	}
	// check if first name is first in the array
	else {
		// pop affects the original array
		last_name = split_name.pop();
	}

	// check if middle initial exists
	middle_initial = split_name.at(-1);

	if (middle_initial.length <= 2 || middle_initial.endsWith('.')) {
		// assign m.i, and remove period if it exists
		middle_initial = split_name.pop().charAt(0); // pop affects the original array
	} else middle_initial = null;

	first_name = split_name.join(' ');

	return { first_name, last_name, middle_initial };
}

/**
 * Convert a 12:00 PM time into 24:00
 * @param {string} timeString in 12 hour format
 * @returns {string} timeString in 24 hour format
 */
function to24HourFormat(timeString) {
	const [time, period] = timeString.split(' ');
	let [hours, minutes] = time.split(':');

	hours = period === 'PM' && hours < 12 ? parseInt(hours, 10) + 12 : parseInt(hours, 10) % 12;

	return `${hours.toString().padStart(2, '0')}:${minutes}`;
}

/**
 * Removes duplicate objects from an array based on first depth values.
 *
 * @param {Array} array - An array of objects containing schedule data.
 * @returns {Array} the same array with removed duplicates.
 */
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

/**
 * Convert a rank to a single char number ex. 1st >> 1
 * @param {string} yearLevel
 * @returns {char} year
 */
function yearLevelFormat(yearLevel) {
	const year = yearLevel.split(' ')[0];
	return rankFormat(year);
}

/**
 * Get the semester and initial year of a semester-range ex. 1st 2022-2023 >> {1, 2022}
 * @param {string} semYear
 * @returns
 */
function semesterYearFormat(semYear) {
	const semester = semYear.split(' ')[0];
	const year = semYear.split(' ').at(-1).split('-')[0];

	return {
		semester: rankFormat(semester),
		year: year,
	};
}

const Formatter = {
	rankFormat,
	collegeFormat,
	courseFormat,
	getFullName,
	getSplitName,
	removeNameTitle,
	toTitleCase,
	to24HourFormat,
	removeDuplicateObjects,
	yearLevelFormat,
	semesterYearFormat,
};
export default Formatter;
