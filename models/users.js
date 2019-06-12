// Required modules
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// User schema
const user_schema = new mongoose.Schema({
    username: {
        type: 'String',
        required: true,
        unique: true
    },
    password: {
        type: 'String',
        required: true
    }
});

// Password hashing
user_schema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});


// Export module
module.exports = mongoose.model('user', user_schema);
