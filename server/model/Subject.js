const $jsonSchema = {
	bsonType: 'object',
	required: ['code', 'name', 'lec_units', 'lab_units', 'created'],
	properties: {
		code: {
			bsonType: 'string',
			description: 'Course code - Required.',
		},
		name: {
			bsonType: 'string',
			description: 'Course name - Required.',
		},
		lec_units: {
			bsonType: 'int',
			description: 'Number of lecture units - Required.',
		},
		lab_units: {
			bsonType: 'int',
			description: 'Number of laboratory units - Required.',
		},
		created: {
			bsonType: 'timestamp',
			description: 'Timestamp of subject creation - Required.',
		},
	},
};

const Subject = {
	name: 'Subject',
	schema: {
		validator: { $jsonSchema },
	},
	indexes: [[{ code: 1 }, { unique: true }]],
};

export default Subject;
