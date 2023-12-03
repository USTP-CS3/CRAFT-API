/**
 * middleware for logging requests to the database
 *
 * req.craft object that contains the following:
 * - isValid: boolean
 * - message: string
 * - account: object (contains the client id token info)
 * - package: object (contains the student data from the database)
 *
 */

import Request from '../../db/model/Request.js';
import Student from '../../db/model/Student.js';
import morgan from 'morgan';

const listen = morgan(async function (tokens, req, res) {
	if (req.craft.account != null) {
		try {
			const student = await Student.findOne({ where: { email: req.craft.account.email } });
			let StudentId = null;

			// Associate the request to the student or faculty id.
			if (student != null) StudentId = student.getDataValue('id');

			const log = {
				response_time: tokens['response-time'](req, res),
				remote_address: tokens['remote-addr'](req, res),
				total_time: tokens['total-time'](req, res),
				method: tokens.method(req, res),
				status: tokens.status(req, res),
				url: tokens.url(req, res),
				authenticated: req.craft.authenticated,
				message: req.craft.message,
				StudentId: StudentId,
			};

			await Request.create(log);
		} catch (error) {
			console.error('Error processing request:', error);
		}
	}
});

const Logger = { listen };
export { Logger };
