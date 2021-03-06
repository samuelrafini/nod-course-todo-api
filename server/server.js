require('./config/config');

// npm install body parser and express 
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
let { mongoose } = require('./db/mongoose');
let { Todo } = require('./models/todo');
let { User } = require('./models/user');
const { ObjectId } = require('mongodb');
const { authenticate } = require('./middleware/authenticate')


const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
    let todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
    // console.log(req.body);
})

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
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

app.get('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;

    if (!ObjectId.isValid(id)) {
        console.log('Id is not valid');
        return res.status(404).send();
    }

    // no longer needed because of the middleware Todo.findById(id).then((todos) => {
    Todo.findOne({
        id: id,
        _creater: req.user._id
    }).then((todos) => {
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

app.post('/users', (req, res) => {
    let body = _.pick(req.body, ['email', 'password'])
    let user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
        //    res.send(user);
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

app.get('/users/me', authenticate, (req, res) => {
    let token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        res.send(user);
    }).catch((e) => {
        res.status(401).send();
    });
})

app.post('/users/login', (req, res) => {
    // let email = req.params.email;
    // let password = req.params.password;
    let body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token => {
            res.header('x-auth', token).send(user);
        }))
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    })
});



app.listen(port, () => {
    console.log(`Started on port ${port}`);
});



module.exports = { app };

