const $jsonSchema = {
	bsonType: 'object',
	required: ['first_name', 'last_name', 'email', 'picture', 'created'],
	properties: {
		first_name: {
			bsonType: 'string',
			description: 'First name of account - Required.',
			maxLength: 50,
		},
		last_name: {
			bsonType: 'string',
			description: 'Last name of account - Required.',
			maxLength: 50,
		},
		email: {
			bsonType: 'string',
			description: 'Email of account - Required.',
			maxLength: 100,
		},
		picture: {
			bsonType: 'string',
			description: 'Url of account picture - Required.',
		},
		cert_file: {
			bsonType: 'binData',
			description: 'Certificate file of account - Optional.',
		},
		cert_hash: {
			bsonType: 'string',
			description: 'Certificate hash of account - Optional.',
			maxLength: 65, // SHA256
		},
		created: {
			bsonType: 'timestamp',
			description: 'Timestamp of account creation - Required.',
		},
	},
};

const Account = {
	name: 'Account',
	schema: {
		validator: { $jsonSchema },
	},
	indexes: [
		[{ email: 1 }, { unique: true }],
		[{ cert_hash: 1 }, { unique: true }],
	],
};

export default Account;
