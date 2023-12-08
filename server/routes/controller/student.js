import Student from '../../db/model/Student.js';
import Extractor from '../../lib/extractor.js';

/**
 * Returns the account's student data
 */
function get_self_data(req, res) {
	// package comes from has_self_data middleware
	res.json(req.craft);
	return;
}

/**
 * Multer middleware for uploaded file should be defined before this is used
 *
 * temporarily store the extracted data from the pdf
 * until the user agreed on the next request
 */

// temporary storage for the extracted data from the pdf
// import to database after the user agreed on the next request
// the email of the user is the key of temp_cor_extract object
let temp_cor_extract = {};

function reject(message, data = null) {
	req.craft.message = message + error.message;
	req.craft.package = data;
	res.status(500).json(req.craft);
}

function post_extract_corpdf(req, res) {
	try {
		// Access the uploaded file from req.file
		const corpdf = req.file.buffer;

		const accept = (message, data) => {
			req.craft.message = message;
			req.craft.package = data;

			// temporarily store the file and data with email as key
			temp_cor_extract[req.craft.account.email] = {
				file: corpdf,
				data: req.craft.package,
			};

			res.status(200).json(req.craft);
		};

		Extractor.getCorInfo(corpdf)
			.then(({ studentData, subjectData }) => {
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
					reject('Unsupported College', { studentData, subjectData });
					return;
				}

				// if college is CITC, respond with a success message
				else if (studentData.college == 'COLLEGE OF INFORMATION TECHNOLOGY AND COMPUTING') {
					accept('Extract Success', { studentData, subjectData });
					return;
				}
			})
			.catch(error => {
				// TODO: save the file to misc/extract_failed folder for debugging
				reject('Extract Failed');
				return;
			});
	} catch (error) {
		// TODO: save the file to misc/extract_failed folder for debugging
		reject('Invalid Buffer');
		return;
	}
}

function post_import_corpdf(req, res) {
	// TODO: get the file and data from temp_cor_extract based on req.craft.account.email
	// save the file to misc and import the data to the database
	// if error, save the file to misc/failed_import folder
	try {
	} catch (error) {}
}

const StudentController = { get_self_data, post_extract_corpdf, post_import_corpdf };
export { StudentController };
