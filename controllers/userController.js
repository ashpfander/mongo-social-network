// Grabs the models from the models folder
const { User, Thought } = require('../models');

// Aggregate function to get the number of overall users
const userCount = async () => {
  const numberOfUsers = await User.aggregate().count('userCount');
  return numberOfUsers;
}

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find().select('-__v').populate('thoughts').populate('friends');

      const allUsers = {
        users,
        userCount: await userCount(),
      };

      res.json(allUsers);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select('-__v').populate('thoughts').populate('friends');

      if (!user) {
        return res.status(404).json({ message: 'No user with associated ID' })
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with associated ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and thoughts associated with the selected user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'This user does not exist' });
      }

      const thought = await Thought.findOneAndUpdate(
        { _id: req.body.thoughtId },
        { $set: { username: null } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: 'User deleted, but no thought was found',
        });
      }

      res.json({ message: 'User successfully deleted!' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add a friend to a user
  async addFriend(req, res) {
    console.log('You are adding a friend! Cool!');
    console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user associated with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove a friend from a user
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user associated with that ID' });
      }

      res.json({ message: 'Friend successfully removed. :(' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};