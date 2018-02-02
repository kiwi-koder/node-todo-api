require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');

var { mongoose } = require("./db/mongoose");
var { Todo } = require('./models/todo');
var { User } = require("./models/user");

var app = express();

const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
})

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    })
})

app.get('/todos/:id', (req, res) => {
    var { id }  = req.params;
    if (!ObjectId.isValid(id)) return res.status(404).send("Invalid ID");
    Todo.findById(id).then((todo) => {
    if (!todo) return res.status(404).send("Todo not found")
        res.send({todo});
    }, (e) => {
        res.status(400).send(e);
    })
})

app.delete('/todos/:id', (req, res) => {
    var { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(404).send("Invalid ID");
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) return res.status(404).send("Todo not found")
        res.status(200).send({todo});
    })

})

app.patch('/todos/:id', (req, res) => {
    var { id } = req.params;
    var body = _.pick(req.body, ['text', 'completed']) //Able to pick off properties if they exist.
    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })
});

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password'])
    var user = new User(body);
    user.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
})

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});


module.exports = { app };
