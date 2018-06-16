let mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// let  Todo = mongoose.model('Todo', {
//     text: {
//         type: String,
//         required: true,
//         minlenght: 1,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     },
//     completedAt: {
//         type: Number,
//         default: null
//     }
// })



let  User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlenght: 1,
        trim: true
    }
})

let newUser = new User({
    email: 'samuel@something.com    '
})

newUser.save().then( (doc)=> {
    console.log('saved todo', doc)
    console.log('------------------------------------------')
    console.log(JSON.stringify(doc,undefined,2));
}, (e) => {
    console.log('Unable to save todo', e)
})
//save new something

// let newTodo = new Todo({
//     text: 'Cook dinner'
// });

// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// }, (e) => {
//     console.log('Unable to save todo');
// })

// let newTodo2 = new Todo({
//    text: '  bdnbd   '

// });

// newTodo2.save().then( (doc)=> {
//     console.log('saved todo', doc)
//     console.log('------------------------------------------')
//     console.log(JSON.stringify(doc,undefined,2));
// }, (e) => {
//     console.log('Unable to save todo', e)
// })