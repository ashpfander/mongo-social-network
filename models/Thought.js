// Requires the schema and model information from the mongoose package
const { Schema, model } = require('mongoose');
const moment = require('moment');

// Schema to create a Reaction
const reactionSchema = new Schema(
    {
      reactionId: {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId,
      },
      reactionBody: {
          type: String,
          required: true,
          maxlength: 280,
      },
      username: {
          type: String,
          required: true,
      },
      createdAt: {
          type: Date,
          default: Date.now,
          get: createdAtMoment => moment(createdAtMoment).format("MMMM Do YYYY, h:mm:ss a"),
      },
    },
    {
      toJSON: {
          getters: true,
      },
    }
);

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

// Creates a virtual called reactionCount that includes how many reactions this thought has
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Converts our thought schema into a model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;