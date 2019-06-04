const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ClookSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
});


module.exports = mongoose.model('Clook', ClookSchema)
