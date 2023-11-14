import PDFParser from "pdf2json";


//
// Main (self-executing async function)
(async function main() {
    
    const filePath = "./cor2.pdf";
    
    try {
        const output = await getCorInfo(filePath);

        // Uncomment this to show verbose data
        console.log(JSON.stringify(output, null, 4));
    } 
    catch (error) {
        console.error("Error in main:", error);
    }

})();




//
// Public Functions

async function getCorInfo(filePath) {
    try {
        return await _getCorInfo(filePath);
    } 
    catch (error) {
        console.error(error);
        throw error;
    }
}




//
// Private Functions

function _getCorInfo(filePath) {
    return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser();
        
        pdfParser.loadPDF(filePath);
        pdfParser.on("pdfParser_dataError", reject);
        pdfParser.on("pdfParser_dataReady", (pdfData) => {
            const data = _getPdfTextArray(pdfData);
            const studentData = _getStudentData(data);
            const subjectData = _getSubjectData(data);
            resolve({ studentData, subjectData });
        });
    });
}

function _getPdfTextArray(pdfData) {
    // select first page text data
    const pageObject = pdfData['Pages'][0]['Texts'];
    // iterate text object and append to text array     
    const data = [];

    let customIndex = 0;
    for (const [fixedIndex, textObject] of pageObject.entries()) {
        
        const text = decodeURIComponent(textObject['R'][0]['T']);
        
        // if no scholarship, push 'None' to the array
        if (customIndex == 26 && text == 'Contact #:') {
            data.push('N/A');
            customIndex++; // customIndex will be 27
        } 

        data.push(text);
        customIndex++;
    }
    return data;
}

function _getStudentData(data) {
    return {
        // index <= 31 is student data
        document_title:  data[0],
        campus:          data[1],
        registration_no: data[15],
        id:              data[16],
        name:            data[17],
        gender:          data[18],
        age:             data[19],
        college:         data[20],
        department:      data[21],
        major:           data[22],
        year_level:      data[23],
        curriculum:      data[24],
        academic_year:   data[25],
        scholarship:     data[26],
        nationality:     data[30],
        contact:         data[31],
        // index >= 39 is schedules data
    };
}

function _getSubjectData(data) {
    // all index greater than 38 is subject, units, schedules data
    const subjects = [];
    for (let i = 39; i < data.length; i += 8) {

       // check if first entry is a schedule, then append to previous object's schedule
        const patternOfSchedule = /((S|M|T|W|Th|F)*(\s\d\d?:\d\d\s(AM|PM)))\s-(\s\d\d?:\d\d\s(AM|PM))/g
        const isScheduleOfPreviousSubject = data[i].match(patternOfSchedule);

        const patternOfTotalUnit = /[Tt]otal\s[Uu]nit(\(s\))?/g
        const isLastSubject = data[i].match(patternOfTotalUnit);

        if (isScheduleOfPreviousSubject) {
            subjects[subjects.length - 1].schedule.push(
                _getRegexString(data[i], patternOfSchedule).result
            );

            subjects[subjects.length - 1].room.push(
                _getRegexString(data[i], patternOfSchedule).residue
            );

            subjects[subjects.length - 1].instructor.push(data[i + 1]);
            
            i -= 6; // proceed to next iteration
        }

        // check if its there are no more subject
        else if (isLastSubject) { break; }
        
        // otherwise, append the new subject
        else {
            subjects.push(
                {
                    instructor: [data[i]],
                    subject:    data[i + 1],
                    lecture:    data[i + 2],
                    laboratory: data[i + 3],
                    credit:     data[i + 4],
                    code:       data[i + 6],
                    section:    data[i + 7],

                    schedule:  [
                        _getRegexString(data[i + 5], patternOfSchedule).result
                    ],

                    room: [
                        _getRegexString(data[i + 5], patternOfSchedule).residue
                    ],
                }
            );
        }
    }
    
    return subjects;
}

function _getRegexString(text, regex) {
    const match = text.match(regex);

    if (match) { // only get the first match
        // string that matches the regex
        const result = match[0]; 
        
        // string that does not match the regex
        const residue = text.replace(result, '').trim(); 
        return { result, residue };
    } 
    else {
        console.error("Something went wrong in _getRegexString()", text, regex);
    }
}