const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const TimeSheetSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    weekOf: {
        type: Date,
        required: true
    },
    Monday: {
        type: Number,
        required: true,
        min: 0
    },
    Tuesday: {
        type: Number,
        required: true,
        min: 0
    },
    Wednesday: {
        type: Number,
        required: true,
        min: 0
    },
    Thursday: {
        type: Number,
        required: true,
        min: 0
    },
    Friday: {
        type: Number,
        required: true,
        min: 0
    },
    Saturday: {
        type: Number,
        required: true,
        min: 0
    },
    Sunday: {
        type: Number,
        required: true,
        min: 0
    },
    submitted: {
        type: Boolean,
        default: false
    },
    approved: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('TimeSheet', TimeSheetSchema);