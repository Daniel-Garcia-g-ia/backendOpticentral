const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const userSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

})
const model = mongoose.model('users', userSchema);


module.exports = model;