const { ObjectId } = require('mongodb');
const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user")

var id = "5a74388eac4fc8681bd3adbd11";
var userId = "5a73518d8759392c41a3f00b";
// if (!ObjectId.isValid(id)) {
//     console.log("ID not valid");
// }
// Todo.find({
//     _id: id // In find you don't need to convert id to ObjectID
// }).then((todos) => {
//     console.log("Todos", todos);
// });

// //Returns one at most
// Todo.findOne({
//     _id: id 
// }).then((todo) => {
//     console.log("Todos", todo);
// });

// Todo.findById(id).then((todoById) => {
//     if (!todoById) return console.log("Id not found");
//     console.log("Todos", todoById);
// }).catch((e) => console.log(e));

User.findById(userId).then((user) => {
    if (!user) {
        return console.log("Id not found");
    }
    console.log("User by Id", user);
}).catch((e) => console.log(e));