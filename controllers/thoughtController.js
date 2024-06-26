const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().select('-__v').populate('reactions');
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v').populate('reactions');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with associated ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      
        if (!updatedUser) {
          console.log('User not found');
          // Handle the case where the user is not found
        } else {
          console.log(updatedUser);
        }
      } catch (error) {
        console.error(error);
        // Handle the error appropriately
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
    // Update a thought
    async updateThought(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!thought) {
            res.status(404).json({ message: 'No thought with associated ID' });
          }
    
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
    },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'No thought with associated ID' });
      }

      res.json({ message: 'Thought has been deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
    // Create a reaction
    async createReaction(req, res) {
        try {
          const reaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
          );
          res.json(reaction);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
    },
    // Delete a reaction
    async removeReaction(req, res) {
      try {
        const reaction = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { _id: req.params.reactionId } } },
          { new: true }
        );
  
        if (!reaction) {
          return res.status(404).json({ message: 'No reaction with associated ID' });
        }
  
        return res.json({ message: 'Reaction has been deleted!' });
      } catch (err) {
        return res.status(500).json(err);
      }
    },
};