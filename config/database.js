const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URI;

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;


module.exports = mongoose;
