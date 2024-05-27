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

function setProduction(dataProduction) {
    return new Promise((resolve, reject) => {
        const newProduction = new model(dataProduction);
        
        newProduction.save()
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(new Error('Error al guardar el reporte: ' + error.message));
            });
    });
}

module.exports = {
    get,
    getOne,
    setProduction
}