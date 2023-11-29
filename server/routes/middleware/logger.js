import Request from '../../db/model/Request.js';
import Student from '../../db/model/Student.js';
import morgan from 'morgan';

const logger = morgan(async function (tokens, req, res) {

    // note: req.craft.log are processed by middleware
    // check if email in student database, 
    // then assign StudentId
    const data = req.craft.log;

    const StudentId = (data.email !== undefined)
        ? await Student.findOne({ where: { email: data.email} })
        : null;

    const log = {
        response_time:  tokens['response-time'](req, res),
        remote_address: tokens['remote-addr'](req, res),
        total_time:     tokens['total-time'](req, res),
        method:         tokens.method(req, res),
        status:         tokens.status(req, res),
        url:            tokens.url(req, res),
        verified:       data.isValid,
        message:        data.message,
        StudentId:      StudentId,
    };

    Request.create(log);
});

export { logger };