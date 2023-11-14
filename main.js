// import fs from "fs";
import PDFParser from "pdf2json";


const _pdf_to_textArray = (pdfData) => {
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

const _get_student_data = (data) => ({
    // index < 32 is student data
    id:              data[16],
    name:            data[17],
    campus:          data[1],
    gender:          data[18],
    age:             data[19],
    college:         data[20],
    department:      data[21],
    major:           data[22],
    year_level:      data[23],
    curriculum:      data[24],
    scholarship:     data[26],
    nationality:     data[30],
    contact:         data[31],
    document_title:  data[0],
    registration_no: data[15],
    academic_year:   data[24],            
    // index > 38 is schedules data
})

const _get_schedule_data = (data) => {
    // all index greater than 38 is subject, units, schedules data
    const schedules = [];
    for (let i = 39; i < data.length; i += 8) {

       // TODO: if i is a schedule, then append to previous object's schedule

       // TODO: otherwise:

        schedules.push(
            {
                instructor: data[i],
                subject: data[i + 1],
                lecture: data[i + 2],
                laboratory: data[i + 3],
                credit: data[i + 4],
                schedule: data[i + 5],
                code: data[i + 6],
                section: data[i + 7],
            }
        );
    }
    return schedules;

}

const getStudentInfo = (filePath) => {
    
    // create pdf parser instance
    const pdfParser = new PDFParser();
    
    // create functions handling data ready and errors
    pdfParser.loadPDF(filePath);
    pdfParser.on("pdfParser_dataError", errData  => console.error(errData.parserError));
    pdfParser.on("pdfParser_dataReady", pdfData => {
        const data        = _pdf_to_textArray(pdfData);
        const studentData = _get_student_data(data);
        const scheduleData = _get_schedule_data(data);

        console.log(scheduleData);
    });
}

getStudentInfo("./cor.pdf");