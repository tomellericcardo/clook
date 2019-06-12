// Required modules
const mongoose = require('mongoose');


// Clook schema
const clook_schema = new mongoose.Schema({
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
module.exports = mongoose.model('clook', clook_schema);
