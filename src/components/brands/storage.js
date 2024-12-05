const model = require('../models/brandsModel');


async function get() {
   
    const process = await model.find()
    return process}

module.exports = {

    get

}