const usernames = [
  'Ashesaur',
  'BrogBinger',
  'Bubbie',
  'FunkinDawg',
  'GranolaJones',
  'HotFlavors',
  'Ilia',
  'Lernantino',
  'MaxiSporks',
  'ScoochiWoo'
];

const thoughts = [
  'A good example of how time does not exist is when you have an upcoming dentist appointment. Makes you wonder was I not just there a couple months ago?',
	'I think the best superpower to have would be teleportation.',
	'Silence can be incredibly loud.',
	'Animation and cartoons are not just for kids! Adults can enjoy them too.',
	'The ocean is overwhelmingly scary with how much we do not know about it.',
	'Fall is the best season!'
];

const reactions = [
  'You are so right!',
	'I did not think of it that way.',
	'Are you sure?',
	'I agree!',
	'You make a good point.',
	'That is not right.',
	'That is crazy!',
	'I had that same thought not too long ago.'
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random username
const getRandomUsername = () =>
  `${getRandomArrItem(usernames)}`;

// Generate a random thought that we can add to username object.
const getRandomThought = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(thoughts),
    });
  }
  return results;
};

// Generate random reaction that we can add to thought object.
const getRandomReaction = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(reactions),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomUsername, getRandomThought, getRandomReaction };