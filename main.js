// import fs from "fs";
import PDFParser from "pdf2json";


const getStudentInfo = (filePath) => {
    
    const pdfParser = new PDFParser();

    const assertTreeStructure = (pdfData) => {
        const textData = pdfData['Pages'][0]['Texts'];

        const studentInfo = [];
        const scheduleContainer = [];
        let schedule = {};
        let counter = 0;


        for (const [index, text] of textData.entries()) {
            const decodeText = decodeURIComponent(text['R'][0]['T']);
            
            if      (index < 32) studentInfo.push(decodeText);
            else if (index > 38) {

                const sequence = [
                    'instructor',
                    'subject',
                    'lecture',
                    'laboratory',
                    'credit',
                    'datetime',
                    'code',
                    'section'
                ];
                schedule[sequence[counter]] = decodeText;
                counter++;

                // get row
                if (counter > 7) {
                    counter = 0;
                    scheduleContainer.push(schedule);
                    schedule = {};
                } 

                // TODO: check if row has multiple dates
                 

                // TODO: include total lab,lec,credit units
                if (decodeText
                        .toLowerCase()
                        .startsWith('total unit')
                ) { break; }
            }
        }



        const studentInfoDict = {
            id:              studentInfo[16],
            name:            studentInfo[17],
            campus:          studentInfo[1],
            gender:          studentInfo[18],
            age:             studentInfo[19],
            college:         studentInfo[20],
            department:      studentInfo[21],
            major:           studentInfo[22],
            year_level:      studentInfo[23],
            curriculum:      studentInfo[24],
            scholarship:     studentInfo[26],
            nationality:     studentInfo[30],
            contact:         studentInfo[31],
            document_title:  studentInfo[0],
            registration_no: studentInfo[15],
            academic_year:   studentInfo[24],            
            
            // 32 > subject, units, schedules
        }
        

        // temporary fixed-column indentation
        let maxKeyLength = Math.max(...Object.keys(studentInfoDict).map(key => key.length));
        for (let key in studentInfoDict) {
            let spacing = ' '.repeat(maxKeyLength - key.length + 1);
            console.log(key + ":" + spacing, studentInfoDict[key]);
        }

        for (let schedule of scheduleContainer) {
            console.log('\n-----------------------------');
            let maxKeyLength = Math.max(...Object.keys(schedule).map(key => key.length));
            for (let key in schedule) {
                let spacing = ' '.repeat(maxKeyLength - key.length + 1);
                console.log(key + ":" + spacing, schedule[key]);
            }
            console.log('-----------------------------\n');
        }

        
    }
    
    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
    pdfParser.on("pdfParser_dataReady", pdfData => assertTreeStructure(pdfData));
    pdfParser.loadPDF(filePath);
}

getStudentInfo("./cor.pdf");






// fs.writeFile("output.json", jsonData, function(err) {
//     if(err) {
//         return console.log(err);
//     }
//     console.log("The file was saved!");
// });