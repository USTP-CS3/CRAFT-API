const $jsonSchema = {
	bsonType: 'object',
	required: ['first_name', 'last_name', 'created'],
	properties: {
		account_id: {
			bsonType: 'array',
			description: 'Must be an array of ObjectId values - Optional',
			items: { bsonType: 'objectId' },
			uniqueItems: true,
		},
		first_name: {
			bsonType: 'string',
			description: 'First name of faculty - Required.',
			maxLength: 50,
		},
		last_name: {
			bsonType: 'string',
			description: 'Last name of faculty - Required.',
			maxLength: 50,
		},
		created: {
			bsonType: 'timestamp',
			description: 'Timestamp of faculty creation - Required.',
		},
	},
};

const Faculty = {
	name: 'Faculty',
	schema: {
		validator: { $jsonSchema },
	},
	indexes: [
		[{ account_id: 1 }, { unique: true }],
		[{ first_name: 1, last_name: 1 }, { unique: true }],
	],
};

export default Faculty;
