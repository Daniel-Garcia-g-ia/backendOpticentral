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

const getMostRecentReport = (equipmentId) => {
    return new Promise((resolve, reject) => {
        model.find({ "equipmentId": equipmentId })
            .sort({ 'processData.production.brewId': -1 }) // Sort by brewId in descending order
            .limit(1) // Get the most recent one
            .then(process => {
                resolve(process[0])
            })
            .catch(error => {
                reject(new Error('Error al obtener el reporte'));
            });
    });
};

function updateProductionReport(id, reportItem, processDataId, productionId, reportId, typeReport) {

    return new Promise((resolve, reject) => {
        model.findById(id)
            .then(document => {
                const processData = document.processData.id(processDataId)
                const production = processData.production.id(productionId)
                const report = production.report.id(reportId)
                console.log(reportItem)
                report[typeReport].push(reportItem)
                return document.save();

            })
            .then(updatedDocument => {
                resolve(updatedDocument);
            })
            .catch(error => {
                reject(new Error('Error al obtener el reporte'));
            })
    });
}

function updateICReport(id, reportItem, processDataId, typeReport) {

    return new Promise((resolve, reject) => {
        model.findById(id)
            .then(document => {
                const report = document.processData.id(processDataId)
                const repo = report.OPI[0]

                repo[typeReport].push(reportItem)
                return document.save();

            }).then(updatedDocument => {
                resolve(updatedDocument);
            })
            .catch(error => {
                reject(new Error('Error al obtener el reporte'));
            })
    })

}
function oneUpdateReport(id, processDataId, OPI_id, typeReport, reportId, updateData) {
    return new Promise((resolve, reject) => {
        model.findById(id)
            .then(document => {

                const processData = document.processData.find(p => p._id.toString() === processDataId)
                if (!processData) {
                    reject(new Error('Process Data no encontrado'));
                }
                const OPIReport = processData.OPI.find(opi => opi._id.toString() === OPI_id)
                if (!OPIReport) {
                    reject(new Error('Reporte no encontrado'));
                }
                const report = OPIReport[typeReport]

                const reportItem = report.find(r => r._id.toString() === reportId)

                Object.assign(reportItem, updateData)

                return document.save()


            }).then(updateDocuemnt => {
                resolve(updateDocuemnt)
            }).catch(error => {
                reject(new Error('Error al obtener el reporte' + error.message));
            })
    })
}
function oneUpdateProductionReport(id, processDataId, productionId, reportId, itemReportId, updateData) {
    return new Promise((resolve, reject) => {

        model.findById(id)
            .then(document => {
                const processData = document.processData.find(p => p._id.toString() === processDataId)
                if (!processData) {
                    reject(new Error('Process Data no encontrado'));
                }
                const production = processData.production.find(p => p._id.toString() === productionId)

                if (!production) {
                    reject(new Error('Producción no encontrada'));
                }

                const report = production.report.find(r => r._id.toString() === reportId)

                if (!report) {
                    reject(new Error('Reporte no encontrado'));
                }

                const itemReport = report.productionReportItem.find(i => i._id.toString() === itemReportId)
                if (!itemReport) {
                    reject(new Error('Reporte no encontrado'));
                }

                Object.assign(itemReport, updateData)
                return document.save()




            }).then(updateDocuemnt => {
                resolve(updateDocuemnt)
            })
            .catch(error => {
                reject(new Error('Error al obtener el reporte' + error.message));
            })
    })
}



module.exports = {
    get,
    getOne,
    setProduction,
    getMostRecentReport,
    updateProductionReport,
    updateICReport,
    oneUpdateReport,
    oneUpdateProductionReport
}