import PDFParser from "pdf2json";
import Scheduler from "./scheduler.js";

//
// Public Functions

async function getCorInfo(filePath) {
    try {
        return await _getCorInfo(filePath);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export { getCorInfo };


//
// Private Functions

function _getCorInfo(filePath) {
    return new Promise((resolve, reject) => {
        if (filePath.endsWith('.pdf')) {
            _getPdfInfo(filePath, resolve, reject);
        } else if (filePath.endsWith('.csv')) {
            _getCsvInfo(filePath, resolve, reject);
        } else {
            reject(new Error('Unsupported file format'));
        }
    });
}

function _getPdfInfo(filePath, resolve, reject) {
    const pdfParser = new PDFParser();
    const datesToCheck = ["S", "M", "T", "F"]; // example

    pdfParser.loadPDF(filePath);
    pdfParser.on("pdfParser_dataError", reject);
    pdfParser.on("pdfParser_dataReady", (pdfData) => {
        const data = _getPdfTextArray(pdfData);
        const studentData = Scheduler.parseStudentData(data);
        const subjectData = Scheduler.parseScheduleData(data);
        const frequencyMap = Scheduler.getSubjectFrequencyAtDates(subjectData, datesToCheck);
        const availabilityData = Scheduler.checkAvailabilityWithSchedule(subjectData, datesToCheck);
        resolve({ studentData, subjectData, frequencyMap, availabilityData });
    });
}

/* CSV format is not supported yet

function _getCsvInfo(filePath, resolve, reject) {
    const csvData = _parseCsvData(filePath);
    const datesToCheck = ["S", "M", "T", "F"]; // example
    // Process CSV data using Scheduler methods
    const studentData = Scheduler.parseStudentData(csvData);
    const subjectData = Scheduler.parseScheduleData(csvData);
    const frequencyMap = Scheduler.getSubjectFrequencyAtDates(subjectData, datesToCheck);
    const availabilityData = Scheduler.checkAvailabilityWithSchedule(subjectData, datesToCheck);
    
    resolve({ studentData, subjectData, frequencyMap, availabilityData });
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

function _parseCsvData(filePath) {
    // return an array based on the data provided from google forms csv
    return [
        // what is being parsed?
    ];
}*/