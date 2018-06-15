//same as const below
// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp2', (err,db) => {
    if (err){
        console.log(err);
        return console.log('Unable to connect to mongodbserver');
        
    }

    console.log('Connected to MongoDB server');

    // db.collection('Users').findOneAndUpdate({
    //     _id: new ObjectID('5b23ccc94fc4162b13954f76')
    // },{
    //     $set: {
    //         completed: true
    //     }
    // },{
    //     returnOriginal: false
    // }
    // ).then( (result) => {
    //     console.log(result);
    // })

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b23ccc94fc4162b13954f76')
    },{
        $inc: {
            age: 1
        }
    },{
        returnOriginal: false
    }
    ).then( (result) => {
        console.log(result);
    })

    // db.close();
});

