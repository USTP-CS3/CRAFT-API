const $jsonSchema = {
	bsonType: 'object',
	required: [
		'subject_id',
		'faculty_id',
		'student_id',
		'section',
		'start_time',
		'end_time',
		'semester',
		'year',
		'created',
	],
	properties: {
		subject_id: {
			bsonType: 'objectId',
			description: 'Course id of schedule - Required.',
		},
		faculty_id: {
			bsonType: 'objectId',
			description: 'Faculty id of schedule - Required.',
		},
		room_id: {
			bsonType: 'objectId',
			description: 'Room id of schedule - Optional.',
		},
		student_id: {
			bsonType: 'array',
			description: 'Must be an array of ObjectId values - Required',
			items: { bsonType: 'objectId' },
			uniqueItems: true,
		},
		section: {
			bsonType: 'string',
			description: 'Section of schedule - Required.',
		},
		start_time: {
			bsonType: 'date',
			description: 'Start time of schedule - Required.',
		},
		end_time: {
			bsonType: 'date',
			description: 'End time of schedule - Required.',
		},
		semester: {
			bsonType: 'int',
			description: 'Semester of schedule - Required.',
			enum: [1, 2],
		},
		year: {
			bsonType: 'date',
			description: 'Year of schedule - Required.',
		},
		created: {
			bsonType: 'timestamp',
			description: 'Timestamp of student creation - Required.',
		},
	},
};

const Schedule = {
	name: 'Schedule',
	schema: {
		validator: { $jsonSchema },
	},
	indexes: [[{ subject_id: 1, faculty_id: 1, semester: 1, section: 1, day: 1 }, { unique: true }]],
};

export default Schedule;
