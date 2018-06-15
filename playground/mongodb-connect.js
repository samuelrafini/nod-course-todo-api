//same as const below
// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();

console.log(obj);


var user = {name: 'sambo', age: 20};
var {name} = user;
console.log(name);


MongoClient.connect('mongodb://localhost:27017/TodoApp2', (err,db) => {
    if (err){
        console.log(err);
        return console.log('Unable to connect to mongodbserver');
        
    }

    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //     text: 'something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err){
    //         return console.log('Unable to instert todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // })

    // Insert new doc into users (name, age, location)

    // db.collection('Users').insertOne({
    //     _id: 123,
    //     name: 'sammy',
    //     age: 20,
    //     location: 'Puerto Rico'
    // }, (err, result) => {
    //     if (err){
    //         return console.log(err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // })

    db.collection('Users').insertOne({
        name: 'sammy',
        age: 20,
        location: 'Puerto Rico'
    }, (err, result) => {
        if (err){
            return console.log(err);
        }

        console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
    })

    db.close();
});