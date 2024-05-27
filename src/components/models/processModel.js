const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productionSchema = new Schema({
    brand: {
        type: String,
        required: false
    },
    brewId:{
        type: Number,
        reqired: false,
    },
    volume:{
        type: Number,
        required: false
    },
    startTime: {
        type: String,
        required: false

    },
    endTime: {
        type: String,
        required: false
    }

})

const processDataSchema = new Schema({
    date: {
        type: String,
        required: false,
    },
    turn:{
        type:String,
        required: true
    },
    release: {
        type: Boolean,
        required: true
    },
    production: {
        type: [productionSchema],
        required: false

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
        type: [processDataSchema],
        required: false

    }



})
const model = mongoose.model('productions', processSchema);


module.exports = model;