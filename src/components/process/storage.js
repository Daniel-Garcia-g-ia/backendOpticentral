const model = require('../models/processModel');

async function get() {
    const process = await model.find();
    return process
}



async function getOne(equipmentId, date, turn) {
    try {
        const process = await model.find({
            equipmentId: equipmentId,
            "processData.date": date,
            "processData.turn": turn
        })
        
        return process

    } catch (error) {
        throw new Error('Error al obtener el reporte')
    }



}


module.exports = {
    get,
    getOne
}