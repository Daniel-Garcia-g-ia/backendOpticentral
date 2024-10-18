const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const reportItemProduction = new Schema({
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
    volume: {
        type: Number,
        required: false
    }
})

const reportItemIC = new Schema({
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    totalTime: {
        type: Number,
        required: true
    },
    system: {
        type: String,
        required: true
    },
    subSystem: {
        type: String,
        required: true
    },
    component: {
        type: String,
        required: true
    },
    failureMode: {
        type: String,
        required: true
    },
    machine: {
        type: String,
        required: true
    },
    solution: {
        type: String,
        required: true
    }
})

const reportItemEC = new Schema({
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

const reportItemDPA = new Schema({
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
    typeStop: {
        type: String,
        required: false
    },
    subTypeStop: {
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
const reportItemNST = new Schema({
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

const reportOpiItem = new Schema({
    productionReportItem: {
        type: [reportItemProduction],
        required: true
    },

})



const reportOPiSchmema = new Schema({
    IC: {
        type: [reportItemIC],
        required: false
    },
    EC: {
        type: [reportItemEC],
        required: false
    },
    DPA: {
        type: [reportItemDPA],
        required: false
    },
    NST: {
        type: [reportItemNST],
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
        type: [processDataSchema],
        required: false

    }



})
const model = mongoose.model('productions', processSchema);


module.exports = model;