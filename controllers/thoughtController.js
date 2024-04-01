const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

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

      await User.findOneAndUpdate(
        { username },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

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
          const reaction = await Thought.create(req.body).findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: reactionId } },
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
      const reaction = await Thought.findOneAndDelete({ _id: req.params.reactionId }).findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: reactionId }}},
        { runValidators: true, new: true }
      );

      if (!reaction) {
        res.status(404).json({ message: 'No reaction with associated ID' });
      }

      res.json({ message: 'Reaction has been deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};