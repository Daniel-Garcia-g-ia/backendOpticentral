const model = require('../models/equipmentModel');
const { put } = require('./network');

async function get() {


    const equipments = await model.find();
    return equipments
}





module.exports = {
    get
  
}