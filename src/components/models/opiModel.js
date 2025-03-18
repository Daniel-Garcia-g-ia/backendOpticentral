const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commonSchema = new Schema({
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
    date: {
        type: String,
        required: false,
    },
    turn: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: false

    },
    endTime: {
        type: String,
        required: false
    },
    totalTime: {
        type: Number,
        required: false
    },



})


const ICSchema = new Schema({

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
    date: {
        type: String,
        required: false,
    },
    turn: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: false

    },
    endTime: {
        type: String,
        required: false
    },
    totalTime: {
        type: Number,
        required: false
    },
    typeReport:{
        type:String,
        required:false
    },

    system: {
        type: String,
        required: false

    },
    subSystem: {
        type: String,
        required: false
    },
    component: {
        type: String,
        required: false
    },
    failureMode: {
        type: String,
        required: false

    },
    machine: {
        type: String,
        required: false

    },
    solution: {
        type: String,
        required: false

    }



})

const ECSchema = new Schema({
    equipmentId: {
        type: String,
        required: false
    },
    equipmentName: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false,
    },
    date: {
        type: String,
        required: false,
    },
    turn: {
        type: String,
        required: false
    },
    startTime: {
        type: String,
        required: false

    },
    endTime: {
        type: String,
        required: false
    },
    totalTime: {
        type: Number,
        required: false
    },
    typeReport:{
        type:String,
        required:false
    },
    typeStop: {
        type: String,
        required: false

    },
    subTypeStop: {
        type: String,
        required: false

    },
    failureMode: {
        type: String,
        required: false

    },
    solution: {
        type: String,
        required: false

    }


})

const DPASchema = new Schema({
    equipmentId: {
        type: String,
        required: false
    },
    equipmentName: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false,
    },
    date: {
        type: String,
        required: false,
    },
    turn: {
        type: String,
        required: false
    },
    startTime: {
        type: String,
        required: false

    },
    endTime: {
        type: String,
        required: false
    },
    totalTime: {
        type: Number,
        required: false
    },
    typeReport:{
        type:String,
        required:false
    },
    typeReports: {
        type: String,
        required: false
    },
    subTypeReport: {
        type: String,
        required: false
    },
    specification: {
        type: String,
        required: false
    },
    solution: {
        type: String,
        required: false

    }
})

const NSTSchema = new Schema({
    equipmentId: {
        type: String,
        required: false
    },
    equipmentName: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false,
    },
    date: {
        type: String,
        required: false,
    },
    turn: {
        type: String,
        required: false
    },
    startTime: {
        type: String,
        required: false

    },
    endTime: {
        type: String,
        required: false
    },
    totalTime: {
        type: Number,
        required: false
    },
    typeReport:{
        type:String,
        required:false
    },
    typeStop: {
        type: String,
        required: false
    },
    subTypeStop: {
        type: String,
        required: false
    },
    solution: {
        type: String,
        required: false

    }

})



const opiSchema = new Schema({
    equipmentId: {
        type: String,
        required: false

    },
    equipmentName: {
        type: String,
        required: false

    },
    location: {
        type: String,
        required: false

    },
    report: [{
        IC: {
            type: [ICSchema],
            required: false
        },
        EC: {
            type: [ECSchema],
            required: false

        },
        DPA: {
            type: [DPASchema],
            required: false

        },
        NST: {
            type: [NSTSchema],
            required: false

        }

    }]
})

const modelOpi = mongoose.model('opiReports', opiSchema)

module.exports = modelOpi