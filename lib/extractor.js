import PDFParser from "pdf2json";
import Scheduler from "./scheduler.js";

//
// Public Functions

async function getCorInfo(filePath) {

    // TODO: check if document title is 'CERTIFICATEOFREGISTRATION'
    try {
        return await _getCorInfo(filePath);
    } 
    catch (error) {
        // TODO: make a log file for all errors that occur
        console.error(error);
        throw error;
    }
}

export { getCorInfo };


//
// Private Functions

function _getCorInfo(filePath) {
    return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser();
        
        pdfParser.loadPDF(filePath);
        pdfParser.on("pdfParser_dataError", reject);
        pdfParser.on("pdfParser_dataReady", (pdfData) => {
            const data = _getPdfTextArray(pdfData);
            const studentData = Scheduler.parseStudentData(data);
            const subjectData = Scheduler.parseScheduleData(data);
            resolve({ studentData, subjectData });
        });
    });
}

function _getPdfTextArray(pdfData) {
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
               customIndex == 26 && text.replaceAll(' ', '') == 'Contact#:'  
            || customIndex == 31 && text.replaceAll(' ', '') == 'UNIT'  
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
}