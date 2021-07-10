const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    number_application: { ////max number of applications
        type: Number,
        required: true,
    },
    number_applications_applied: {
        type: Number,
        default: 0
    },
    number_position: { //max number of positions
        type: Number,
        required: true
    },
    number_positions_filled: {
        type: Number,
        default: 0
    },
    postdate: {
        type: Date,
        default: Date.now
    },
    deadlinedate: {
        type: String,
        required: true
    },
    deadlineorgdate: {
        type: String,
        required: true
    },
    deadlinetime: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    number_rated: {
        type: Number,
        default: 0
    },
    totrating: {
        type: Number,
        default: 0
    },
    salary: {
        type: Number,
        required: true
    },
    typeofjob: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        min: 0,
        max: 6,
        required: true
    },
    recruiterid: {
        type: String,
        required: true
    },
    recruitername: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Job', jobSchema)


