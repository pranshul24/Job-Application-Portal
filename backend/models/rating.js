const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    recruiterid: {
        type: String,
        required: true
    },
    employeeid: {
        type: String, required: true
    }
});

module.exports = mongoose.model('Rating', ratingSchema)