const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EducationSchema = new Schema({
    education: {
        type: String,
        required: true
    },
    startyear: {
        type: String,
    }
    , endyear: {
        type: String,
        required: true
    }
})

const applicantSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String, required: true
    },
    email: {
        type: String, required: true
    },
    education: [EducationSchema],
    skills: [{ type: String, required: true }],
    password: {
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
    profileimage: {
        type: String
    },
    resume: {
        type: String
    },
    number_application: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    },
    accepted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Applicant', applicantSchema)