// npm install body parser and express 
const express = require('express');
const bodyParser = require('body-parser');
let { mongoose } = require('./db/mongoose');
let { Todo } = require('./models/todo');
let { User } = require('./models/user');
const { ObjectId } = require('mongodb')


const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
    // console.log(req.body);
})

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos })
    }, (e) => {
        res.status(400).send(e);
    })
})

// app.get('/todos/:id', (req, res) => {
//     var id = req.params.id;

//     if (!ObjectId.isValid(id)){
//     console.log('Id is not valid');
//         res.status(404).send();
//     }

//     Todo.findById(id).then( (todos) => {
//         res.send({todos})
//     }, (e) => {
//         res.status(404).send(e)
//     })

// })
// Andrew mead ways above myway

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectId.isValid(id)) {
        console.log('Id is not valid');
        return res.status(404).send();
    }

    Todo.findById(id).then((todos) => {

        if (!todos) {
            return res.status(404).send();
        }

        res.send({ todos })

    }).catch((e) => {
        res.status(400).send();
    })
})

app.listen(3000, () => {
    console.log('Started on port 3000');
});



module.exports = { app };

