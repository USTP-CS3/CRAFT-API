import Extractor from '../server/lib/extractor.js';

Extractor.getCorInfo('../server/misc/cor2.pdf')
	.then(({ studentData, subjectData }) => {
		console.log(studentData);
		console.log(subjectData);
	})
	.catch((error) => {
		console.log(error);
	});
