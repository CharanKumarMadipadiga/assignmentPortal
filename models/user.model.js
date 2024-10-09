const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "firstName is reqired"]
    },

    lastName: {
        type: String,
        required: [true, "lastName is reqired"]
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
    },

    assignments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Assignment'
        }
    ]
},
    {
        timestamps: true
    }
)

userSchema.virtual('fullName').get(function() {
    return this.firstName + ' '+ this.lastName;
});

const User = mongoose.model('User', userSchema)

module.exports = User;

