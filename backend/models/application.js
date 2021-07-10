const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    sop: {
        type: String,
        required: true
    },
    applicantid: {
        type: String,
        required: true
    },
    jobid: {
        type: String,
        required: true
    },
    recruiterid: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        // required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    recruitername: {
        type: String,
        required: true
    },
    accepted: {
        type: Boolean,
        default: false
    },
    rejected: {
        type: Boolean,
        default: false
    },
    stage: {
        type: String,
        default: "Applied"
    },
    acceptdate: {
        type: Date,
    },
    rated: {
        type: Boolean, default: false
    }
});

module.exports = mongoose.model('Application', applicationSchema)


