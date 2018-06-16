let mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// module.exports = {
//     mongoose: mongoose
// }
// shorter es6 simplified on one line
module.exports = {mongoose};