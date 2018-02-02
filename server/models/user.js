const mongoose = require('mongoose');
const validator = require('validator');
// {
//     email: 'andrew@example.com',
//     password: 'y3454h54h54u567u6j65y',
//     tokens: [{
//         access: 'auth',
//         token: '32157434hf3bh34nfv8934vb'
//     }]
// }

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{value} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

module.exports = { User }