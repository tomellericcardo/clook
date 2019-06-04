const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const salt = 10;

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

UserSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});


module.exports = mongoose.model('User', UserSchema);
