const $jsonSchema = {
	bsonType: 'object',
	required: [
		'ip_address',
		'auth',
		'message',
		'method',
		'url',
		'status',
		'res_time',
		'total_time',
		'created',
	],
	properties: {
		account_id: {
			bsonType: 'objectId',
			description: 'ObjectId of account - Optional.',
		},
		ip_address: {
			bsonType: 'string',
			description: 'IP address of request - Required.',
		},
		auth: {
			bsonType: 'bool',
			description: 'Has auth token - Required.',
		},
		message: {
			bsonType: 'string',
			description: 'Message of request - Required.',
		},
		method: {
			bsonType: 'string',
			description: 'Method of request - Required.',
			enum: ['GET', 'POST', 'PATCH', 'DELETE'],
		},
		url: {
			bsonType: 'string',
			description: 'Url of request - Required.',
		},
		status: {
			bsonType: 'int',
			description: 'Status of request - Required.',
		},
		res_time: {
			bsonType: 'double',
			description: 'Response time of request - Required.',
		},
		total_time: {
			bsonType: 'double',
			description: 'Total time of request - Required.',
		},
		created: {
			bsonType: 'timestamp',
			description: 'Timestamp of request creation - Required.',
		},
	},
};

const Request = {
	name: 'Request',
	schema: {
		validator: { $jsonSchema },
	},
};

export default Request;
