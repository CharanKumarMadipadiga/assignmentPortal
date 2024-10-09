const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },

    lastName: {
        type: String,
        required: [true, "Last name is required"]
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

    assignments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment'
    }]
}, 
{
    timestamps: true
});

// Virtual field to get full name
adminSchema.virtual('fullName').get(function() {
    return this.firstName + ' ' + this.lastName;
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
