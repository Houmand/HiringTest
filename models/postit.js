const mongoose = require('mongoose');

const PostitSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Postit = mongoose.model("postit",PostitSchema);
module.exports = Postit;

