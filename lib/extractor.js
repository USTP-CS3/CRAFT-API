import PDFParser from "pdf2json";


// Extractor Class-------------------------------------------------------------------------------------------------

const Extractor = {
    getCorInfo
};

export default Extractor;

// -------------------------------------------------------------------------------------------------


/**
 * Extracts student data and schedule data from the Certificate of Registration
 * 
 * @param {string} cor Directory file path of the Certificate of Registration in pdf format  
 * @returns {Object} JSON containing student data and schedule data
 */
async function getCorInfo(cor) {

    /**
     * Private Function:
     * Creates a promise that resolves to an object containing student data and schedule data
     * 
     * @param {string} filePath Directory file path of the Certificate of Registration in pdf format
     * @returns {Promise<Object>} contains student data and schedule data
     */
    const _getCorInfo = (filePath) => {
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

    /**
     * Private Function:
     * Extracts all text from the pdf data and returns an array of text
     * 
     * @param {Object} pdfData A JSON formatted object containing the pdf data
     * @returns {Array<string>} contains all text from the pdf data
     */
    const _getPdfTextArray = (pdfData) => {
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

    /**
     * Private Function:
     * Extracts student data from the pdf data and returns an object in json format
     * 
     * @param {Array<string>} data Maps the text array to its corresponding data
     * @returns {Object} JSON containing student data
     */
    const _getStudentData = (data) => {
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

    /**
     * Private Function:
     * Extracts schedule data from the pdf data and returns an array of objects in json format
     * 
     * @param {Array<string>} data Maps the text array to its corresponding data 
     * @returns {Object} JSON containing schedule data
     */
    const _getScheduleData = (data) => {
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


    // TODO: check if document title is 'CERTIFICATEOFREGISTRATION'
    try {
        return await _getCorInfo(cor);
    } 
    catch (error) {
        // TODO: make a log file for all errors that occur
        console.error(error);
        throw error;
    }
}


