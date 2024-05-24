const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const processDataShema = new Schema({
    date: {
        type: Date,
        required: false,
    },
    release: {
        type: Boolean,
        required: true
    }
})

const processSchema = new Schema({

    equipmentId: {
        type: String,
        required: true
    },
    equipmentName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    processData: {
        type: [processDataShema],
        required: true

    }



})
const model = mongoose.model('productions', processSchema);


module.exports = model;