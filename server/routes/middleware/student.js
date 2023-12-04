import Student from '../../db/model/Student.js';

/**
 * Middleware to check if a student already has data
 */
function has_self_data(req, res) {
	// get student data from database
	const query = {
		where: { email: req.craft.account.email },
		raw: true,
		nest: true,
	};

	Student.findOne(query).then((student) => {
		// send student data if exists
		if (student != undefined) {
			req.craft.message = 'Student Exists';
			req.craft.package = student;
			next();
			return;
		}
		// send null if not exist
		else {
			req.craft.message = 'Student Not Found';
			req.craft.package = null;
			res.status(404).json(req.craft);
			return;
		}
	});
}

/**
 * Middleware to check if a student doesn't have data
 */
function has_empty_data(req, res) {
	// get student data from database
	const query = {
		where: { email: req.craft.account.email },
		raw: true,
		nest: true,
	};

	Student.findOne(query).then((student) => {
		// send error if exists
		if (student != undefined) {
			req.craft.message = 'Student Exists';
			req.craft.package = student;
			res.status(403).json(req.craft);
			return;
		}
		// send next if not exist
		else {
			req.craft.message = 'Student Not Found';
			req.craft.package = null;
			next();
			return;
		}
	});
}

const StudentMiddleware = { has_self_data, has_empty_data };
export { StudentMiddleware };
