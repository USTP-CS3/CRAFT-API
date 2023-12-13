import { MongoClient } from 'mongodb';
import Room from '../model/Room.js';
import Schedule from '../model/Schedule.js';
import Account from '../model/Account.js';
import Faculty from '../model/Faculty.js';
import Student from '../model/Student.js';
import Subject from '../model/Subject.js';
import Request from '../model/Request.js';

const db_name = 'DB_CRAFT';
const db_uri = 'mongodb://localhost:27017';

async function createCollections() {
	let connection;
	try {
		// Connect to the database
		connection = await MongoClient.connect(db_uri);
		const database = connection.db(db_name);

		// Create the collection with schema validation
		const collection = await Promise.all([
			database.createCollection(Room.name, Room.schema),
			database.createCollection(Schedule.name, Schedule.schema),
			database.createCollection(Account.name, Account.schema),
			database.createCollection(Faculty.name, Faculty.schema),
			database.createCollection(Student.name, Student.schema),
			database.createCollection(Subject.name, Subject.schema),
			database.createCollection(Request.name, Request.schema),
		]);

		// Create indexes for the collection
		await Promise.all([
			...Room.indexes.map(index => collection[0].createIndex(...index)),
			...Schedule.indexes.map(index => collection[1].createIndex(...index)),
			...Account.indexes.map(index => collection[2].createIndex(...index)),
			...Faculty.indexes.map(index => collection[3].createIndex(...index)),
			...Student.indexes.map(index => collection[4].createIndex(...index)),
			...Subject.indexes.map(index => collection[5].createIndex(...index)),
			// Request has no indexes
		]);

		console.log('Successfully created collections in the database.\n\n');
	} catch (error) {
		console.error('Error creating collections:', error);
	} finally {
		// Close the connection
		if (connection) connection.close();
	}
}

// Call the function to create collections
createCollections();
