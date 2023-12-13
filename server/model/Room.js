const $jsonSchema = {
	bsonType: 'object',
	required: ['name', 'created'],
	properties: {
		name: {
			bsonType: 'string',
			description: 'Room name - Required.',
			maxLength: 50,
		},
		created: {
			bsonType: 'timestamp',
			description: 'Timestamp of room creation - Required.',
		},
	},
};

const Room = {
	name: 'Room',
	schema: {
		validator: { $jsonSchema },
	},
	indexes: [[{ name: 1 }, { unique: true }]],
};

export default Room;
