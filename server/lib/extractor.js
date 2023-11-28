import PDFParser from "pdf2json";
import { logToFile } from "../main.js";

//
// Public Functions

async function getCorInfo(filePath) {

    return await _getCorInfo(filePath);
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
            const studentData = _getStudentData(data);
            const subjectData = _getScheduleData(data);
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

function _getStudentData(data) {
    return {
        // index <= 31 is student data
        document_title:  data[0].replaceAll(' ',''),
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

function _getScheduleData(data) {
    const subjects = [];

    const patternOfSchedule = /(^(S|M|T|W|Th|F)*(\s\d\d?:\d\d\s(AM|PM)))\s-(\s\d\d?:\d\d\s(AM|PM))/g;
    const patternOfWeekday  = /^(S|M|Th|T|W|F)*/g;
    const patternOfTime     = /\d\d?:\d\d\s(AM|PM)/g;

    const _parseSchedule = (scheduleString) => {
        const schedule   = scheduleString.match(patternOfSchedule)[0];
        const room       = scheduleString.replace(schedule, '').trim();
        const mixedDays  = schedule.match(patternOfWeekday)[0];
        const timeStart  = schedule.match(patternOfTime)[0];
        const timeEnd    = schedule.match(patternOfTime)[1];
        const weekdays   = [];

        for (let j = 0; j < mixedDays.length; j++) {
            if (mixedDays[j] == 'T' && mixedDays[j + 1] == 'h') {
                weekdays.push('Th');
                j++;
                continue;
            }
            weekdays.push(mixedDays[j]);
        }

        return { room, weekdays, timeStart, timeEnd };
    };

    for (let i = 39; i < data.length; i += 8) {
        const isLastSubject = data[i] === 'Total Unit(s)';
        if (isLastSubject) { break; }

        const isScheduleOfPreviousSubject = data[i].match(patternOfSchedule);

        if (isScheduleOfPreviousSubject) {
            const previousSubject = subjects.at(-1);
            const { room, weekdays, timeStart, timeEnd } = _parseSchedule(data[i]);

            weekdays.forEach((weekday) => {
                previousSubject.schedule.push({
                    instructor: data[i + 1],
                    weekday,
                    timeStart,
                    timeEnd,
                    room,
                });
            });

            i -= 6; // proceed to the next iteration
        } 
        
        else {
            const subject = {
                subject: data[i + 1],
                lecture: data[i + 2],
                laboratory: data[i + 3],
                credit: data[i + 4],
                code: data[i + 6],
                section: data[i + 7],
                schedule: [],
            };

            const { room, weekdays, timeStart, timeEnd } = _parseSchedule(data[i + 5]);

            weekdays.forEach((weekday) => {
                subject.schedule.push({
                    instructor: data[i],
                    weekday,
                    timeStart,
                    timeEnd,
                    room,
                });
            });

            subjects.push(subject);
        }
    }

    return subjects;
}
