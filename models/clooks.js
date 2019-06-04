const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ClookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    duration: {
        type: Integer,
        required: true
    }
});


module.exports = mongoose.model('Clook', ClookSchema)
