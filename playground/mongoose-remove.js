const {ObjectId} = require('mongodb')
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.remove({}, (result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove

Todo.findOneAndRemove('5b34bb6a7a6e22fa88534288').then((todo) => {
    console.log(todo);
});

