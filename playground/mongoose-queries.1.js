const {ObjectId} = require('mongodb')
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


let id = '5b24fa8e9626ecd33594d4f1AA';

// if (!ObjectId.isValid(id)){
//     console.log('Id is not valid')
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// })

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo)
// })

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo by id', todo)
// }).catch( (e)=> {
//     console.log(e);
// })

User.findById('5b24afb1ca39f02f3037dc3311').then( (user) => {
    if(!user){
        return console.log('Unable to find user');
    };

    console.log(JSON.stringify(user,undefined,2));

}, (e) => {
    console.log(e)
});