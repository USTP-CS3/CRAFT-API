import Student from '../../db/model/Student.js';

import Extractor from '../../lib/extractor.js';

/**
 * Returns the account's student data
 */
const get_data = (req, res) => {
	// get student data from database
	const query = {
		where: { email: req.craft.account.email },
		raw: true,
		nest: true,
	};

	Student.findOne(query).then((student) => {
		// package: route specific output
		req.craft.package = student;

		// check if student data exists
		if (student != undefined) {
			res.json(req.craft);
			return;
		}

		// send error if not exist
		else {
			req.craft.message = 'Student Not Found';
			res.status(404).json(req.craft);
			return;
		}
	});
};

/**
 * Multer middleware for uploaded file should be defined before this is used
 */
const post_setup = (req, res) => {
	try {
		// Access the uploaded file from req.file
		const corpdf = req.file.buffer;

		// Process the file as needed
		// For example, you can save it to disk or perform other operations

		Extractor.getCorInfo(corpdf)
			.then(({ studentData, subjectData }) => {
				if (studentData.college == 'COLLEGE OF INFORMATION TECHNOLOGY AND COMPUTING') {
					// Respond with a success message
					req.craft.message = 'Extraction Success';
					req.craft.package = { studentData, subjectData };
					res.status(200).json(req.craft);
					return;
				} else {
					// Respond with a unsupported message
					req.craft.message = 'Unsupported College';
					req.craft.package = { studentData, subjectData };
					res.status(200).json(req.craft);
				}
			})
			.catch((error) => {
				req.craft.message = 'Extraction Failed';
				res.status(500).json(req.craft);
				return;
			});
	} catch (error) {
		req.craft.message = 'Upload Failed';
		res.status(500).json(req.craft);
		return;
	}
};

const StudentController = { get_data, post_setup };
export { StudentController };
