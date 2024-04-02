// Requires the schema and model information from the mongoose package
const { Schema, model } = require('mongoose');

// Schema to create a User model
const userSchema = new Schema(
  {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value);
            },
            message: 'Invalid email address. Please try again.',
        },
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
        }
    ]
  },
  {
    toJSON: {
        virtuals: true,
    },
    id: false,
  }
);

// Creates a virtual called friendCount that includes how many friends the user has
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Converts our user schema into a model
const User = model('user', userSchema);

module.exports = User;