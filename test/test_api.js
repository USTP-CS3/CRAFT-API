const form = document.querySelector('form'); // Select the form element

/**
 * Check if the file is a PDF.
 * @param {File} file - The file to check.
 */
function checkIfPdf(file) {
	if (file.type !== 'application/pdf') {
		window.alert('Only PDF files are allowed'); // Alert if the file is not a PDF
		return false;
	}
	return true;
}

// Add a submit event listener to the form
form.addEventListener('submit', (e) => {
	e.preventDefault(); // Prevent the default form submit action

	const files = document.querySelector('[type=file]').files; // Get the file(s) from the file input field
	console.log(files); // Log the files for debugging

	const formData = new FormData(); // Create a new FormData object to hold the file data

	for (let i = 0; i < files.length; i++) {
		let file = files[i];
		// Check if the file is a PDF
		if (checkIfPdf(file)) {
			formData.append('files', file); // Append only if it's a PDF
		} else {
			return; // Stop the function if a non-PDF file is encountered
		}
	}

	console.log(...formData); // Log the FormData content for debugging

	// Perform a POST request to the server with the FormData
	fetch('http://localhost:3000/api/setup', {
		method: 'POST',
		body: formData,
	})
		.then((res) => {
			if (!res.ok) {
				throw new Error('Network response was not ok');
			}
			return res.json(); // Make sure to return the parsed response
		})
		.then((data) => {
			console.log(data); // Use the data from the response
		})
		.catch((error) => {
			console.error('There was a problem with the fetch operation:', error);
		});
});
