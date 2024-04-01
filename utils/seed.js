const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUsername, getRandomThought, getRandomReaction } = require('./data');

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


  // Create empty array to hold the users
  const users = [];

  // Loop 5 times to add 5 users to the users array
  for (let i = 0; i < 5; i++) {
    // Get some random thoughts using a helper function that we imported from ./data
    const thought = getRandomThought(2);

    // Get random username
    const username = getRandomUsername();

    users.push({
      username,
      email: `${username}@gmail.com`,
      thoughts: thought,
    });
  }

  // Add users to the collection and await the results
  await User.insertMany(users);

  // Create empty array to hold the thoughts
  const thoughts = [];

  // Loop 5 times to add 5 thoughts to the thoughts array
  for (let i = 0; i < 5; i++) {
    // Get some random reactions using a helper function that we imported from ./data
    const reaction = getRandomReaction(2);

    // Get random thought
    const thought = getRandomThought();

    thoughts.push({
      thought,
      reactions: reaction,
    });
  }

  // Add users to the collection and await the results
  await Thought.insertMany(thoughts);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
	console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});