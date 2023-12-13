const $jsonSchema = {
	bsonType: 'object',
	required: [
		'account_id',
		'student_id',
		'first_name',
		'last_name',
		'age',
		'gender',
		'year_level',
		'nationality',
		'department',
		'college',
		'created',
	],
	properties: {
		account_id: {
			bsonType: 'array',
			description: 'Must be an array of ObjectId values - Required',
			items: { bsonType: 'objectId' },
			uniqueItems: true,
		},
		student_id: {
			bsonType: 'string',
			description: 'Student ID - Required.',
			minLength: 10,
			maxLength: 10,
		},
		first_name: {
			bsonType: 'string',
			description: 'First name of student - Required.',
			maxLength: 50,
		},
		last_name: {
			bsonType: 'string',
			description: 'Last name of student - Required.',
			maxLength: 50,
		},
		md_name: {
			bsonType: 'string',
			description: 'Middle name of student - Optional.',
			maxLength: 1,
		},
		age: {
			bsonType: 'int',
			description: 'Age of student - Required.',
			maximum: 100,
		},
		gender: {
			bsonType: 'string',
			description: 'Gender of student - Required.',
			enum: ['M', 'F'],
		},
		year_level: {
			bsonType: 'int',
			description: 'Year level of student - Required.',
			enum: [1, 2, 3, 4, 5],
		},
		nationality: {
			bsonType: 'string',
			description: 'Nationality of student - Required.',
			maxLength: 100,
		},
		contact: {
			bsonType: 'string',
			description: 'Contact number of student - Optional.',
			minLength: 10,
			maxLength: 10,
		},
		department: {
			bsonType: 'string',
			description: 'Department of student - Required.',
			enum: ['IT', 'CS', 'DS', 'TCM'],
		},
		college: {
			bsonType: 'string',
			description: 'College of student - Required.',
			enum: ['CITC'],
		},
		created: {
			bsonType: 'timestamp',
			description: 'Timestamp of student creation - Required.',
		},
	},
};

const Student = {
	name: 'Student',
	schema: {
		validator: { $jsonSchema },
	},
	indexes: [
		[{ account_id: 1 }, { unique: true }],
		[{ student_id: 1 }, { unique: true }],
		[{ first_name: 1, last_name: 1 }, { unique: true }],
	],
};

export default Student;
