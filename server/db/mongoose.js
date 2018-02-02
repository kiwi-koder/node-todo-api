var mongoose = require('mongoose');

mongoose.Promise = global.Promise;  //Setting it up to use in built promises.
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = { mongoose }