const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const userSchema = new Schema({

    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: false
    }

})
const model = mongoose.model('users', userSchema);


module.exports = model;