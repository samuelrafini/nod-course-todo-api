//same as const below
// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp2', (err,db) => {
    if (err){
        console.log(err);
        return console.log('Unable to connect to mongodbserver');
        
    }

    console.log('Connected to MongoDB server');

    // db.collection('Todos').find().toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch data', err);
    // });


    // db.collection('Todos').find({completed: false}).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch data', err);
    // });


    // db.collection('Todos').find({
    //     _id: new ObjectID("5b23c4baaac3962afe73eea5") 
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch data', err);
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    //     console.log(JSON.stringify(count, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch data', err);
    // });

    db.collection('Users').find({name: 'sammy'}).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('unable to fetch data');
    })
    // db.close();
});