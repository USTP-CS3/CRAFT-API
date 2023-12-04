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

// import to database after the user agreed on the next request
// temporary storage for the extracted data
// the email of the user is the key of temp_cor_extract object
// this contains the the file and data of the corpdf
var temp_cor_extract = {};

// TODO: save it to disk or perform other operations

function post_extract_corpdf(req, res) {
	try {
		// Access the uploaded file from req.file
		const corpdf = req.file.buffer;

		Extractor.getCorInfo(corpdf)
			.then(({ studentData, subjectData }) => {
				// if document is not a Certificate of Registration, throw an error
				if (studentData.document_title != 'CERTIFICATEOFREGISTRATION') {
					throw new Error('Extraction Failed');
				}

				// if college is not CITC or campus is not USTP CDO,
				// response with unsupported message
				else if (
					studentData.campus != 'USTP CDO CAMPUS' ||
					studentData.college != 'COLLEGE OF INFORMATION TECHNOLOGY AND COMPUTING'
				) {
					req.craft.message = 'Unsupported College';
					req.craft.package = { studentData, subjectData };
					// TODO: save the file to misc/extract_unsupported folder
					res.status(200).json(req.craft);
				}

				// if college is CITC, respond with a success message
				else if (studentData.college == 'COLLEGE OF INFORMATION TECHNOLOGY AND COMPUTING') {
					req.craft.message = 'Extraction Success';
					req.craft.package = { studentData, subjectData };

					// temporarily store the file and data with email as key
					temp_cor_extract[req.craft.account.email] = {
						file: corpdf,
						data: req.craft.package,
					};

					res.status(200).json(req.craft);
					return;
				}
			})
			.catch((error) => {
				req.craft.message = 'Extraction Failed';
				req.craft.package = null;
				// TODO: save the file to misc/extract_failed folder
				res.status(500).json(req.craft);
				return;
			});
	} catch (error) {
		req.craft.message = 'Upload Failed';
		req.craft.package = null;
		res.status(500).json(req.craft);
		return;
	}
}

function post_import_corpdf(req, res) {
	// TODO: get the file and data from temp_cor_extract based on req.craft.account.email
	// save the file to misc and import the data to the database
	// if error, save the file to misc/failed_import folder
}

const StudentController = { get_self_data, post_extract_corpdf, post_import_corpdf };
export { StudentController };
