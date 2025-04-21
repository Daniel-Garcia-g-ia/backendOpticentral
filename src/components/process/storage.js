const model = require('../models/processModel');
const modelOpi = require('../models/opiModel');
const { overwriteMiddlewareResult } = require('mongoose');


async function get() {
  const process = await model.find();
  return process
}



async function getOne(equipmentId, date) {
  try {
    const currentDate = new Date(date);
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 1);

    const formattedCurrentDate = currentDate.toISOString().split('T')[0];
    const formattedPreviousDate = previousDate.toISOString().split('T')[0];

    // Utilizamos el operador $elemMatch para acceder a campos dentro de un array (si es el caso)
    const process = await model.find({
      equipmentId: equipmentId,
      processData: {
        $elemMatch: {
          date: {
            $gte: formattedPreviousDate, // Día anterior
            $lte: formattedCurrentDate  // Día actual
          },
          // Incluimos el turno si se proporciona
        }
      }
    });

    return process;

  } catch (error) {
    console.error('Error al obtener el reporte:', error.message);
    throw new Error('Error al obtener el reporte');
  }
}

function getOpiReport(equipmentId, date, turn) {
  return new Promise((resolve, reject) => {
    modelOpi.aggregate([
      {
        $match: { equipmentId: equipmentId }
      },
      {
        $project: {
          equipmentId: 1,
          equipmentName: 1,
          location: 1,
          report: {
            $map: {
              input: "$report",
              as: "rep",
              in: {
                IC: {
                  $filter: {
                    input: "$$rep.IC",
                    as: "ic",
                    cond: {
                      $and: [
                        { $eq: ["$$ic.date", date] },
                        { $eq: ["$$ic.turn", turn] }
                      ]
                    }
                  }
                },
                EC: {
                  $filter: {
                    input: "$$rep.EC",
                    as: "ec",
                    cond: {
                      $and: [
                        { $eq: ["$$ec.date", date] },
                        { $eq: ["$$ec.turn", turn] }
                      ]
                    }
                  }
                },
                DPA: {
                  $filter: {
                    input: "$$rep.DPA",
                    as: "dpa",
                    cond: {
                      $and: [
                        { $eq: ["$$dpa.date", date] },
                        { $eq: ["$$dpa.turn", turn] }
                      ]
                    }
                  }
                },
                NST: {
                  $filter: {
                    input: "$$rep.NST",
                    as: "nst",
                    cond: {
                      $and: [
                        { $eq: ["$$nst.date", date] },
                        { $eq: ["$$nst.turn", turn] }
                      ]
                    }
                  }
                }
              }
            }
          }
        }
      }
    ])
      .then(result => resolve(result))
      .catch(error => reject(new Error('Error al obtener el reporte: ' + error.message)));
  });
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

function ICreport(infoReport, typeReport) {
  return new Promise((resolve, reject) => {

    modelOpi.findOne({ "equipmentId": infoReport.equipmentId })
      .then(result => {

        if (result) {
          result.report[0][typeReport].push(infoReport)
          return result.save()
        } else {

          const newReport = {
            equipmentId: infoReport.equipmentId,
            equipmentName: infoReport.equipmentName,
            location: infoReport.location,
            report: [
              {
                IC: [],
                EC: [],
                DPA: [],
                NST: [],
              },
            ],


          };

          newReport.report[0][typeReport].push(infoReport);

          const report = new modelOpi(newReport);

          return report.save();

        }
      }).then(result => {
        resolve(result)
      }).catch(error => {
        reject(new Error('Error al obtener el reporte' + error.message));
      })





  })
}




function oneUpdateReport(id, processDataId, OPI_id, typeReport, reportId, updateData) {
  return new Promise((resolve, reject) => {
    modelOpi.findById(id)
      .then(document => {

        const reports = document.report[0]
        const reporte = reports[typeReport]
        const updatedReport = reporte.find(p => p._id.toString() === reportId)
        Object.assign(updatedReport, updateData)

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


function downloadReport(date1, date2) {

  return new Promise((resolve, reject) => {
    const startDate = new Date(date1);
    const endDate = new Date(date2);
    const formattedStartTime = startDate.toISOString().split('T')[0];
    const formattedEndTime = endDate.toISOString().split('T')[0];

    model.find({
      processData: {
        $elemMatch: {
          date: {
            $gte: formattedStartTime, // Día anterior
            $lte: formattedEndTime  // Día actual
          },
          // Incluimos el turno si se proporciona
        }
      }
    })
      .then(result => {

        resolve(result);
      })
      .catch(error => {
        reject(new Error('Error al obtener el reporte: ' + error.message));
      });
  });
}

function downloadReportOpi(date1, date2) {
  return new Promise((resolve, reject) => {
    const startDate = new Date(date1);
    const endDate = new Date(date2);

    modelOpi.aggregate([
      {
        $project: {
          equipmentId: 1,
          equipmentName: 1,
          location: 1,
          report: {
            $map: {
              input: "$report",
              as: "rep",
              in: {
                // Se filtra cada categoría según que el campo "date" (convertido a Date)
                // esté dentro del rango [startDate, endDate]
                IC: {
                  $filter: {
                    input: "$$rep.IC",
                    as: "item",
                    cond: {
                      $and: [
                        {
                          $gte: [
                            {
                              $dateFromString: {
                                dateString: "$$item.date",
                                format: "%Y-%m-%d"
                              }
                            },
                            startDate
                          ]
                        },
                        {
                          $lte: [
                            {
                              $dateFromString: {
                                dateString: "$$item.date",
                                format: "%Y-%m-%d"
                              }
                            },
                            endDate
                          ]
                        }
                      ]
                    }
                  }
                },
                EC: {
                  $filter: {
                    input: "$$rep.EC",
                    as: "item",
                    cond: {
                      $and: [
                        {
                          $gte: [
                            {
                              $dateFromString: {
                                dateString: "$$item.date",
                                format: "%Y-%m-%d"
                              }
                            },
                            startDate
                          ]
                        },
                        {
                          $lte: [
                            {
                              $dateFromString: {
                                dateString: "$$item.date",
                                format: "%Y-%m-%d"
                              }
                            },
                            endDate
                          ]
                        }
                      ]
                    }
                  }
                },
                DPA: {
                  $filter: {
                    input: "$$rep.DPA",
                    as: "item",
                    cond: {
                      $and: [
                        {
                          $gte: [
                            {
                              $dateFromString: {
                                dateString: "$$item.date",
                                format: "%Y-%m-%d"
                              }
                            },
                            startDate
                          ]
                        },
                        {
                          $lte: [
                            {
                              $dateFromString: {
                                dateString: "$$item.date",
                                format: "%Y-%m-%d"
                              }
                            },
                            endDate
                          ]
                        }
                      ]
                    }
                  }
                },
                NST: {
                  $filter: {
                    input: "$$rep.NST",
                    as: "item",
                    cond: {
                      $and: [
                        {
                          $gte: [
                            {
                              $dateFromString: {
                                dateString: "$$item.date",
                                format: "%Y-%m-%d"
                              }
                            },
                            startDate
                          ]
                        },
                        {
                          $lte: [
                            {
                              $dateFromString: {
                                dateString: "$$item.date",
                                format: "%Y-%m-%d"
                              }
                            },
                            endDate
                          ]
                        }
                      ]
                    }
                  }
                }
              }
            }
          }
        }
      }
    ])
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(new Error("Error al obtener el reporte: " + error.message));
      });
  });
}

function deleteReport(id, processDataId, productionId) {
  return model.findById(id)
    .then(document => {
      if (!document) {
        throw new Error("Documento no encontrado");
      }

      // Buscar el subdocumento processData por su id
      const processData = document.processData.id(processDataId);
      if (!processData) {
        throw new Error("ProcessData no encontrado");
      }

      // Verificar si el subdocumento production existe y eliminarlo con pull
      const removed = processData.production.pull(productionId);
      if (!removed) {
        throw new Error("Producción no encontrada");
      }

      // (Opcional) Marcar como modificado si es necesario
      document.markModified('processData');

      // Guardar el documento modificado
      return document.save();
    })
    .catch(error => {
      // Propagar el error para que el controlador lo capture
      throw new Error('Error al obtener o guardar el documento: ' + error.message);
    });
}




function deleteReportProduction(id, processDataId, productionId, reportId) {
  return new Promise((resolve, reject) => {
    model.findById(id)
      .then(document => {
        if (!document) {
          return reject(new Error("Documento no encontrado"));
        }

        // Buscar el subdocumento processData por su id
        const processData = document.processData.id(processDataId);
        if (!processData) {
          return reject(new Error("ProcessData no encontrado"));
        }

        // Buscar el subdocumento production dentro de processData por su id
        const production = processData.production.id(productionId);
        if (!production) {
          return reject(new Error("Producción no encontrada"));
        }

        // Asumimos que el reporte se encuentra en el primer elemento del array production.report
        const reportDoc = production.report[0];
        if (!reportDoc) {
          return reject(new Error("Reporte no encontrado en producción"));
        }
        console.log(reportDoc)

        // Usar .pull para eliminar el item del array productionReportItem según su id
        const removedItem = reportDoc.productionReportItem.pull(reportId);
        if (!removedItem) {
          return reject(new Error("Reporte item no encontrado"));
        }


        // Marcar el campo modificado para que Mongoose detecte el cambio
        document.markModified('processData');

        // Guardar el documento modificado
        return document.save();
      })
      .then(result => resolve(result))
      .catch(error => {
        reject(new Error('Error al obtener o guardar el documento: ' + error.message));
      });
  });
}

function deleteReportExternal(id, typeReport, reportId) {
  return new Promise((resolve, reject) => {
    modelOpi.findById(id)
      .then(document => {
        if (!document) {
          return reject(new Error("Documento no encontrado"));
        }

        // Se asume que document.report es un array y se opera sobre el primer elemento
        const reports = document.report[0];
        if (!reports) {
          return reject(new Error("No se encontró report en el documento"));
        }

        // Verificar que exista el arreglo correspondiente al tipo de reporte
        if (!reports[typeReport]) {
          return reject(new Error("El tipo de reporte no existe"));
        }

        // Usar .pull() para eliminar el item con reportId
        const removed = reports[typeReport].pull(reportId);
        if (!removed) {
          return reject(new Error("Reporte item no encontrado"));
        }

        // Marcar el campo modificado para que Mongoose detecte el cambio
        document.markModified('report');
        
        // Guardar el documento modificado
        return document.save();
      })
      .then(result => resolve(result))
      .catch(error => {
        reject(new Error('Error al obtener o guardar el documento: ' + error.message));
      });
  });
}



module.exports = {
  get,
  getOne,
  setProduction,
  getMostRecentReport,
  updateProductionReport,
  updateICReport,
  oneUpdateReport,
  oneUpdateProductionReport,
  downloadReport,
  downloadReportOpi,
  ICreport,
  getOpiReport,
  deleteReport,
  deleteReportProduction,
  deleteReportExternal

}