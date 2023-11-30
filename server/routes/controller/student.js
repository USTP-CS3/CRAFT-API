import Student from "../../db/model/Student.js";

const get_data = (req, res) => {   

    // get student data from database
    const query = { 
        where: { email: req.craft.account.email }, 
        raw: true, nest: true 
    }

    Student.findOne(query)
        .then(student => {
            // package: route specific output
            req.craft.package = student;

            // check if student data exists
            if (student != undefined) {
                res.json(req.craft);
                return;
            }

            // send error if not exist
            else {
                req.craft.message = 'Student Not Found';
                res.status(404).json(req.craft);
                return;
            }
        })
}

const StudentController = { get_data };
export { StudentController };