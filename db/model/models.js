import Student from './Student.js';
import Faculty from './Faculty.js';
import Room from './Room.js';
import Schedule from './Schedule.js';
import Subject from './Subject.js';

Student.belongsToMany(Schedule, {through: 'StudentSchedule'});
Schedule.belongsToMany(Student, {through: 'StudentSchedule'});

Subject.hasMany(Schedule);
Schedule.belongsTo(Subject);

Faculty.hasMany(Schedule);
Schedule.belongsTo(Faculty);

Room.hasMany(Schedule);
Schedule.belongsTo(Room);

export { Student, Faculty, Room, Schedule, Subject };
