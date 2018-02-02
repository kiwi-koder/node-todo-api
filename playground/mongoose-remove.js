const { ObjectId } = require('mongodb');

const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user");

// Todo.remove({}).then((result) => {
//     console.log(result);
// })



// Todo.findOneAndRemove('5a74578c561623b59e264988').then((todo) => {
//     console.log(todo);
// })