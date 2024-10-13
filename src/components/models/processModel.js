const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const reportItemProduction = new Schema({
    startTime: {
        type: String,
        requiered: false
    },
    endTime: {
        type: String,
        required: false
    },
    totalTime: {
        type: Number,
        required: false
    },
    volume: {
        type: Number,
        required: false
    }
})

const reportItemIC = new Schema({
    startTime: {
        type: String,
        requiered: false
    },
    endTime: {
        type: String,
        required: false
    },
    totalTime: {
        type: Number,
        required: false
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

const reportItemExternalStop = new Schema({
    startTime: {
        type: String,
        requiered: false
    },
    endTime: {
        type: String,
        required: false
    },
    totalTime: {
        type: Number,
        required: false
    },
    typeStop :{
        type: String,
        required: false
    },
    detailStop:{
        type:String,
        required:false
    },
    descriptionStop:{
        type: String,
        required: false
    },
    solution: {
        type: String,
        required: false
    }
})

const reportItemUnscheduled= new Schema({
    startTime: {
        type: String,
        requiered: false
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

const reportOpiItem = new Schema({
    productionReportItem: {
        type: [reportItemProduction],
        required: true
    },
    /* productionICItem: {
        type: [reportItemIC],
        required: true
    },
    productionExternalStopItem: {
        type: [reportItemExternalStop],
        required: true
    },
    productionUnscheduledItem: {
        type: [reportItemUnscheduled],
        required: true
    } */
})



const reportOPiSchmema = new Schema({
    EBT: {
        type: Number,
        reqired: false,
    },
    downTime: {
        type: [],
        required: false
    },
    NST: {
        type: [],
        required: false
    },
    plannedDownTime: {
        type: [],
        required: false

    }


})

const productionSchema = new Schema({
    brand: {
        type: String,
        required: false
    },
    brewId: {
        type: Number,
        reqired: false,
    },
    volume: {
        type: Number,
        required: false
    },
    release: {
        type: Boolean,
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
    report: {
        type: [reportOpiItem],
        required: true
    }

})

const processDataSchema = new Schema({
    date: {
        type: String,
        required: false,
    },
    turn: {
        type: String,
        required: true
    },
    release: {
        type: Boolean,
        required: true
    },
    production: {
        type: [productionSchema],
        required: false

    },
    OPI: {
        type: [reportOPiSchmema],
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