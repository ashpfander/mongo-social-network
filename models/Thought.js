// Requires the schema and model information from the mongoose package
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment');

// Schema to create a Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtMoment => moment(createdAtMoment).format("MMMM Do YYYY, h:mm:ss a"),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
        getters: true,
        virtuals: true,
    },
  }
);

// Creates a virtual called friendCount that includes how many friends the user has
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Converts our user schema into a model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;