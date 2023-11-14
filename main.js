import PDFParser from "pdf2json";


//
// Main (self-executing async function)
(async function main() {
    
    const filePath = "./cor.pdf";
    
    try {
        var output = await get_student_info(filePath);
        
        // Uncomment this to show simplified data
        console.log(output);

        // Uncomment this to show verbose data
        // console.log(JSON.stringify(output, null, 4));
    } 
    catch (error) {
        console.error("Error in main:", error);
    }

})();




//
// Public Functions

async function get_student_info(filePath) {
    try {
        return await _pdf_parser(filePath);
    } 
    catch (error) {
        console.error(error);
        throw error; // Propagate the error if needed
    }
}




//
// Private Functions

function _pdf_parser(filePath) {
    return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser();
        
        pdfParser.loadPDF(filePath);
        pdfParser.on("pdfParser_dataError", reject);
        pdfParser.on("pdfParser_dataReady", (pdfData) => {
            const data = _pdf_to_textArray(pdfData);
            const studentData = _get_student_data(data);
            const subjectData = _get_subject_data(data);
            resolve({ studentData, subjectData });
        });
    });
}

function _pdf_to_textArray(pdfData) {
    // select first page text data
    const pageObject = pdfData['Pages'][0]['Texts'];
    // iterate text object and append to text array     
    const data = [];
    for (const [index, textObject] of pageObject.entries()) {
        const text = decodeURIComponent(textObject['R'][0]['T']);
        data.push(text);
    }
    return data;
}

function _get_student_data(data) {
    return {
        // index < 32 is student data
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
        // index > 38 is schedules data
    };
}

function _get_subject_data(data) {
    // all index greater than 38 is subject, units, schedules data
    const subjects = [];
    for (let i = 39; i < data.length; i += 8) {

       // check if first entry is a schedule, then append to previous object's schedule
        const patternOfSchedule = /((S|M|T|W|Th|F)*(\s\d\d?:\d\d\s(AM|PM)))\s-(\s\d\d?:\d\d\s(AM|PM))/g
        const isScheduleOfPreviousSubject = data[i].match(patternOfSchedule);

        const patternOfTotalUnit = /[Tt]otal\s[Uu]nit(\(s\))?/g
        const isLastSubject = data[i].match(patternOfTotalUnit);

        if (isScheduleOfPreviousSubject) {
            subjects[subjects.length - 1].schedule.push(data[i]);
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
                    // schedule:   [data[i + 5]]
                    schedule:  [
                        _extract_pattern(data[i + 5], patternOfSchedule).extract
                    ],

                    room: [
                        _extract_pattern(data[i + 5], patternOfSchedule).remains
                    ],
                }
            );
        }
    }
    
    return subjects;
}

function _extract_pattern(text, regex) {
    // Replace 'yourRegexPattern' with your actual regex pattern
    const match = text.match(regex);

    if (match) {
        const extract = match[0];
        const remains = text.replace(extract, '').trim();
        return { extract, remains };
    } 
    else {
        console.error("Regex Error:", remains, extract);
    }
}