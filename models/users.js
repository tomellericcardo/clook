// Required modules
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// User schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Password hashing
UserSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});


// Export module
module.exports = mongoose.model('User', UserSchema);
