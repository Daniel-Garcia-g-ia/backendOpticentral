const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const equipmentSchema = new Schema({

    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
   

})
const model = mongoose.model('equipments', equipmentSchema);


module.exports = model;

