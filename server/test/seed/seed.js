const {ObjectId} = require('mongodb');
const {Todo} = require('./../../models/todo')
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken')

const userOneId = new ObjectId();
const userTwoId = new ObjectId();


const users = [{
    _id: userOneId,
    email: 'samsam@example.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
    }]
}, {
    _id: userTwoId,
    email: 'JenJen@example.com',
    password: 'userTwoPass',
}]

const todos = [{
    _id: new ObjectId(),
    text: 'first test todo'
}, {
    _id: new ObjectId(),
    text: 'second test todo'
}]

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        let userOne = new User(users[0]).save();
        let userTwo = new User(users[1]).save();

        //wait for them to finish first
        return Promise.all([userOne, userTwo])
    }).then(() => (done()));
}

module.exports = {todos, populateTodos, users, populateUsers}