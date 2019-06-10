// Required modules
const mongoose = require('mongoose');

// Setup mongoose
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


// Database connection
const mongoDB = process.env.MONGODB_URI || 'mongodb://localhost:27017/clook';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;


// Export module
module.exports = mongoose;
