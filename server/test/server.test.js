const expect = require('expect');
const request = require('supertest');
const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { ObjectId } = require('mongodb')


const todos = [{
    _id: new ObjectId(),
    text: 'first test todo'
}, {
    _id: new ObjectId(),
    text: 'second test todo'
}]

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('Should create a new todo', (done) => {
        let text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e))
            });
    });

    it('Should not create a new todo with an invalid body data', (done) => {
        let text = '';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e))
            })
    })
});

describe('GET /todos', () => {
    it('Should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            }).end(done)
    })
})

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        //or use it like this
        let hexID = new ObjectId().toHexString();

        request(app)
            // .get(`/todos/5b329172e4d7b55104252af0`)
            .get(`/todos/${hexID}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if todo is not valid', (done) => {
        request(app)
            .get(`/todos/123abc`)
            .expect(404)
            .end(done);
    })
})

    describe('DELETE /todos', () => {
        it('should remove a todo', (done) => {
            let hexID = todos[1]._id.toHexString();

            request(app)
                .delete(`/todos/${hexID}`)
                .expect(200)
                .expect((res) => {
                    expect(res.body.todos._id).toBe(hexID);
                }).end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    Todo.findById(hexID).then((todos) => {
                        expect(todos).toNotExist();
                        done();
                    }).catch((e) => done(e));

                })
        })

        it('should return 404 if todo not found', (done) => {
            let hexID = new ObjectId().toHexString();


            request(app)
                .delete(`/todos/${hexID}`)
                .expect(404)
                .end(done);
        });

        it('should return 404 if object id is invalid', (done) => {
            request(app)
                .delete(`/todos/123abc`)
                .expect(404)
                .end(done);
        });
    })

    describe('PATCH /todos/:id', () => {
        it('should update the todo', (done) => {
            let hexId = todos[0]._id.toHexString();
            let text = 'this should be the new text';

            request(app)
                .patch(`/todos/${hexId}`)
                .send({
                    completed: true,
                    // text: tex es6 below
                    text
                })
                .expect(200)
                .expect((res) => {
                    expect(res.body.todo.text).toBe(text);
                    expect(res.body.todo.completed).toBe(true);
                    expect(res.body.todo.completedAt).toBeA('number');
                })
                .end(done);
                
        });

        it('should clear completedAt when todo is not completed', (done) => {
                let hexId = todos[1]._id.toHexString();
                let text = 'this should be the new text';
    
                request(app)
                    .patch(`/todos/${hexId}`)
                    .send({
                        completed: false,
                        // text: tex es6 below
                        text
                    })
                    .expect(200)
                    .expect((res) => {
                        expect(res.body.todo.text).toBe(text);
                        expect(res.body.todo.completed).toBe(false);
                        expect(res.body.todo.completedAt).toNotExist();
                    })
                    .end(done);
        });
    })
