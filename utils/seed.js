const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { users, thoughts, reactions } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    // Delete the collections if they exist
    let userCheck = await connection.db.listCollections({ name: 'user' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('user');
    }

    let thoughtsCheck = await connection.db.listCollections({ name: 'thought' }).toArray();
    if (thoughtsCheck.length) {
      await connection.dropCollection('thought');
    }

  // Add users to the collection and await the results
  await User.insertMany(users);

	// Add users to the collection and await the results
  await Thought.insertMany(thoughts, reactions);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
	console.table(thoughts);
	console.table(reactions);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});