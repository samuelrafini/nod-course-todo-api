require('./config/config');

// npm install body parser and express 
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
let { mongoose } = require('./db/mongoose');
let { Todo } = require('./models/todo');
let { User } = require('./models/user');
const { ObjectId } = require('mongodb')


const app = express();
const port = process.env.PORT;

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
        res.status(400).send(e);
    })
})

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectId.isValid(id)) {
        console.log('Id is not valid');
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todos) => {

        if (!todos) {
            return res.status(404).send();
        }

        res.send({ todos });
    }).catch((e) => {
        res.status(400).send(e);
    });

})

app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;

    let body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectId.isValid(id)) {
        console.log('Id is not valid');
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {

        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });

    }).catch((e) => {
        res.status(400).send();
    })

});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});



module.exports = { app };

