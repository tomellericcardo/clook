// Required modules
const mongoose = require('mongoose');


// Clook schema
const Schema = mongoose.Schema;
const ClookSchema = new Schema({
    author: {
        type: 'String',
        required: true
    },
    title: {
        type: 'String',
        required: true
    },
    duration: {
        type: 'Number',
        required: true
    },
    color: {
        type: 'String',
        required: true
    },
    started: Date
});


// Export module
module.exports = mongoose.model('Clook', ClookSchema)
