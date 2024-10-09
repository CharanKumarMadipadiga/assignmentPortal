const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    task: {
        type: String,
        required: true
    },

    admin: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Assignment = mongoose.model("Assignment", assignmentSchema)

module.exports = Assignment