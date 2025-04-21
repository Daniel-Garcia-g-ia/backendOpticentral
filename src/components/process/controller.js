const storage = require('./storage');
const jwt = require('../../jwt');
const generateExcel = require('../../services')
const fs = require('fs');

function getReport(req, res) {

    const token = req.headers['x-access-token']
    const authDenied = {
        auth: false,
    }

    return new Promise((resolve, reject) => {

        jwt.verifyToken(token)
            .then((decoded) => {
                storage.get()
                    .then((result) => {
                        const data = {
                            auth: true,
                            data: result
                        }

                        resolve(data)

                    }).catch((err) => {

                        reject({ status: 402, message: 'error al solicitar informacion', authDenied })

                    })
            }).catch((err) => {

                reject({ status: 401, message: 'error al autenticar token', authDenied })
            })

    })




}

function getOneReport(req, res) {

    const token = req.headers['x-access-token']
    const authDenied = {
        auth: false,
    }

    return new Promise((resolve, reject) => {

        jwt.verifyToken(token)
            .then((decoded) => {
                const equipmentId = req.params.equipmentId
                const date = req.params.date

                storage.getOne(equipmentId, date)
                    .then((result) => {
                        const data = {
                            auth: true,
                            data: result

                        }

                        resolve(data)

                    }).catch((err) => {

                        reject({ status: 402, message: 'error al solicitar informacion', authDenied })

                    })
            }).catch((err) => {

                reject({ status: 401, message: 'error al autenticar token', authDenied })
            })

    })




}


function addProduction(req, res) {
    const token = req.headers['x-access-token']
    const authDenied = {
        auth: false,
        success: false
    }

    return new Promise((resolve, reject) => {

        jwt.verifyToken(token)
            .then((decoded) => {
                const dataProduction = req.body

                /* console.log('Producción guardada:', JSON.stringify(dataProduction, null, 2));     */

                storage.setProduction(dataProduction)
                    .then(() => {
                        const data = {
                            auth: true,
                            success: true

                        }
                        resolve(data)

                    }).catch((err) => {

                        reject({ status: 402, message: 'error procesar informacion', authDenied })

                    })


            }).catch((err) => {
                reject({ status: 401, message: 'Error al autenticar token', authDenied })
            })
    })


}

function getMostRecentReport(req, res) {

    const token = req.headers['x-access-token']
    const authDenied = {
        auth: false,
        success: false
    }

    return new Promise((resolve, reject) => {
        jwt.verifyToken(token)
            .then((decoded) => {
                const equipmentId = req.params.equipmentId
                storage.getMostRecentReport(equipmentId)
                    .then((result) => {
                        if (result === 0) {
                            const data = {
                                auth: true,
                                data: null
                            }
                            resolve(data)
                        } else {
                            const data = {
                                auth: true,
                                data: result
                            }
                            resolve(data)
                        }
                    })
            }).catch((err) => {
                reject({ status: 401, message: 'Error al autenticar token', authDenied })
            })
    })
}

function opiGetReport(req, res) {
    const token = req.headers['x-access-token']
    const authDenied = {
        auth: false,
    }

    return new Promise((resolve, reject) => {
        jwt.verifyToken(token)
            .then((decoded) => {
                const equipmentId = req.params.equipmentId
                const date = req.params.date
                const turn = req.params.turn
                console.log(date, turn, equipmentId)
                storage.getOpiReport(equipmentId, date, turn)
                    .then((result) => {
                        if (result === 0) {
                            const data = {
                                auth: true,
                                data: null
                            }
                            resolve(data)
                        } else {
                            const data = {
                                auth: true,
                                data: result
                            }
                            resolve(data)
                        }
                    })

            }).catch((err) => {
                reject({ status: 401, message: 'Error al autenticar token', authDenied })
            })
    })
}




function opireport(req, res) {

    const token = req.headers['x-access-token']
    const { id } = req.params;
    const { typeReport } = req.body

    const authDenied = {
        auth: false,
    }

    return new Promise((resolve, reject) => {
        jwt.verifyToken(token)
            .then((decoded) => {
                if (typeReport === 'IC') {
                    const { startTime, endTime, totalTime, typeReport, system, subSystem,
                        component, failureMode, equipmentName, machine,solution, date, turn, equipmentId, location, } = req.body
                    storage.ICreport({ startTime, endTime, totalTime, typeReport, system, subSystem, component, failureMode, equipmentName,machine, solution, date, turn, equipmentId, location }, typeReport)
                } else if (typeReport === 'EC') {
                    const { equipmentId, equipmentName, location, date, turn,
                        startTime, endTime, totalTime, typeReport, typeStop, subTypeStop, failureMode, solution
                    } = req.body
                    /* storage.ICreport({},typeReport) */
                    storage.ICreport({
                        equipmentId, equipmentName, location, date, turn,
                        startTime, endTime, totalTime, typeReport, typeStop, subTypeStop, failureMode, solution
                    }, typeReport)
                } else if (typeReport === 'DPA') {
                    const { equipmentId, equipmentName, location, date, turn,
                        startTime, endTime, totalTime, typeReport, typeReports, subTypeReport, specification, solution
                    } = req.body
                    storage.ICreport({
                        equipmentId, equipmentName, location, date, turn,
                        startTime, endTime, totalTime, typeReport, typeReports, subTypeReport, specification, solution
                    }, typeReport)
                } else if (typeReport === 'NST') {
                    const { equipmentId, equipmentName, location, date, turn,
                        startTime, endTime, totalTime, typeReport, typeStop, subTypeStop, solution
                    } = req.body
                    storage.ICreport({
                        equipmentId, equipmentName, location, date, turn,
                        startTime, endTime, totalTime, typeReport, typeStop, subTypeStop, solution
                    }, typeReport)
                }
            }).then(result => {
                const data = {
                    auth: true,
                    updateData: result
                }
                resolve(data);
            }).catch((err) => {

                reject({ status: 402, message: 'Error al solicitar información', authDenied });
            });

    })

}
function updateReportProduction(req, res) {
    const token = req.headers['x-access-token']
    const { id } = req.params;
    const { typeReport } = req.body

    const authDenied = {
        auth: false,
    }

    return new Promise((resolve, reject) => {
        jwt.verifyToken(token)
            .then((decoded) => {

                if (typeReport === 'production') {

                    const { startTime, endTime, totalTime, volume, productionReportItem, date, turn } = req.body
                    storage.updateProductionReport(id, { startTime, endTime, totalTime, volume, date, turn }, req.body.processDataId, req.body.productionId, req.body.reportId, productionReportItem)
                        .then((result) => {
                            const data = {
                                auth: true,
                                updateData: result
                            }
                            resolve(data);
                        })
                        .catch((err) => {

                            reject({ status: 402, message: 'Error al solicitar información', authDenied });
                        });

                } else if (typeReport === 'IC') {

                    const { startTime, endTime, totalTime, system, subSystem, component, failureMode, machine, solution, date, turn } = req.body


                    storage.updateICReport(id, { startTime, endTime, totalTime, system, subSystem, component, failureMode, machine, solution, date, turn },
                        req.body.processDataId, typeReport)
                        .then((result) => {
                            const data = {
                                auth: true,
                                updateData: result
                            }
                            resolve(data);
                        })
                        .catch((err) => {

                            reject({ status: 402, message: 'Error al solicitar información', authDenied });
                        });

                } else if (typeReport === 'EC') {

                    const { startTime, endTime, totalTime, typeStop, subTypeStop, failureMode, solution, date, turn } = req.body

                    storage.updateICReport(id, { startTime, endTime, totalTime, typeStop, subTypeStop, failureMode, solution, date, turn },
                        req.body.processDataId, typeReport)
                        .then((result) => {
                            const data = {
                                auth: true,
                                updateData: result
                            }
                            resolve(data);
                        })
                        .catch((err) => {

                            reject({ status: 402, message: 'Error al solicitar información', authDenied });
                        });




                } else if (typeReport === 'DPA') {
                    const { startTime, endTime, totalTime, typeStop, subTypeStop, specification, solution, date, turn } = req.body

                    storage.updateICReport(id, { startTime, endTime, totalTime, typeStop, subTypeStop, specification, solution, date, turn },
                        req.body.processDataId, typeReport)
                        .then((result) => {
                            const data = {
                                auth: true,
                                updateData: result
                            }
                            resolve(data);
                        })
                        .catch((err) => {

                            reject({ status: 402, message: 'Error al solicitar información', authDenied });
                        });


                } else if (typeReport === 'NST') {
                    const { startTime, endTime, totalTime, typeStop, subTypeStop, solution, date, turn } = req.body

                    storage.updateICReport(id, { startTime, endTime, totalTime, typeStop, subTypeStop, solution, date, turn },
                        req.body.processDataId, typeReport)
                        .then((result) => {
                            const data = {
                                auth: true,
                                updateData: result
                            }
                            resolve(data);
                        })
                        .catch((err) => {

                            reject({ status: 402, message: 'Error al solicitar información', authDenied });
                        });


                }
                else {
                    reject({ status: 402, message: 'error por el tipo de informe', authDenied })

                }


            })
            .catch((err) => {
                reject({ status: 401, message: 'error al autenticar token', authDenied })


            })


    })

}
function updateOneReport(req, res) {
    const token = req.headers['x-access-token'];
    const { id } = req.params;
    const { typeReport, processDataId, OPI_id, reportId, updateData } = req.body
    const { productionId, itemReportId } = req.body


    const authDenied = {
        auth: false,
    }

    return new Promise((resolve, reject) => {
        jwt.verifyToken(token)
            .then((decoded) => {

                if (typeReport !== 'EBT') {

                    storage.oneUpdateReport(id, processDataId, OPI_id, typeReport, reportId, updateData)
                        .then((result) => {
                            const data = {
                                auth: true,
                                updateData: result
                            }
                            resolve(data);


                        }).catch((err) => {

                            reject({ status: 402, message: `Error al solicitar información error: ${err}`, authDenied });
                        });


                } else if (typeReport === 'EBT') {
                    storage.oneUpdateProductionReport(id, processDataId, productionId, reportId, itemReportId, updateData)
                        .then((result) => {
                            const data = {
                                auth: true,
                                updateData: result
                            }
                            resolve(data);


                        }).catch((err) => {

                            reject({ status: 402, message: `Error al solicitar información error: ${err}`, authDenied });
                        });
                }

                else {
                    reject({ status: 402, message: `Error en el tipo de reporte`, authDenied });

                }


            }).catch((err) => {
                reject({ status: 401, message: `error al autenticar token, error: ${err}`, authDenied })


            })

    })
}

function downloadreport(req, res) {
    const token = req.headers['x-access-token'];
    const { date1, date2 } = req.body;
    const authDenied = {
        auth: false,
    }
    return new Promise((resolve, reject) => {
        jwt.verifyToken(token)
            .then((decoded) => {

                storage.downloadReport(date1, date2)
                    .then((result) => {
                        const data = {
                            auth: true,
                            updateData: result
                        }
                        resolve(data);


                    }).catch((err) => {

                        reject({ status: 402, message: 'error al solicitar informacion', authDenied })

                    })
            }).catch((err) => {

                reject({ status: 401, message: 'error al autenticar token', authDenied })
            })

    })



}
function downloadreportOpi(req, res) {
    const token = req.headers['x-access-token'];
    const { date1, date2 } = req.body;
    const authDenied = {
        auth: false,
    }
    return new Promise((resolve, reject) => {
        jwt.verifyToken(token)
            .then((decoded) => {

                storage.downloadReportOpi(date1, date2)
                    .then((result) => {
                        const data = {
                            auth: true,
                            updateData: result
                        }
                        resolve(data);


                    }).catch((err) => {

                        reject({ status: 402, message: 'error al solicitar informacion', authDenied })

                    })
            }).catch((err) => {

                reject({ status: 401, message: 'error al autenticar token', authDenied })
            })

    })



}


function deleteReport(req, res) {
    const token = req.headers['x-access-token'];
    const { id } = req.params;
    const { processDataId, productionId } = req.body;
    const authDenied = {
        auth: false,
    }
    

    return new Promise((resolve, reject) => {
        jwt.verifyToken(token)
            .then((decoded) => {

                storage.deleteReport(id, processDataId, productionId)
                    .then((result) => {
                        const data = {
                            auth: true,
                            reult: result
                        }
                        resolve(data);


                    }).catch((err) => {

                        reject({ status: 402, message: 'error al solicitar informacion', authDenied })

                    })
            }).catch((err) => {

                reject({ status: 401, message: 'error al autenticar token', authDenied })
            })

    })

}



function deleteReportProduction(req, res) {
    const token = req.headers['x-access-token'];
    const { id } = req.params;
    const { processDataId, productionId, reportId } = req.body;
    const authDenied = {
        auth: false,
    }
    

    return new Promise((resolve, reject) => {
        jwt.verifyToken(token)
            .then((decoded) => {

                storage.deleteReportProduction(id, processDataId, productionId, reportId)
                    .then((result) => {
                        const data = {
                            auth: true,
                            reult: result
                        }
                        resolve(data);


                    }).catch((err) => {

                        reject({ status: 402, message: 'error al solicitar informacion', authDenied })

                    })
            }).catch((err) => {

                reject({ status: 401, message: 'error al autenticar token', authDenied })
            })

    })

}

function deleteReportExternal(req, res) {
    const token = req.headers['x-access-token'];
    const { id } = req.params;
    const { typeReport, reportId } = req.body;
    const authDenied = {
        auth: false,
    }
    

    return new Promise((resolve, reject) => {
        jwt.verifyToken(token)
            .then((decoded) => {

                storage.deleteReportExternal(id, typeReport, reportId)
                    .then((result) => {
                        const data = {
                            auth: true,
                            reult: result
                        }
                        resolve(data);


                    }).catch((err) => {

                        reject({ status: 402, message: 'error al solicitar informacion', authDenied })

                    })
            }).catch((err) => {

                reject({ status: 401, message: 'error al autenticar token', authDenied })
            })

    })

}

module.exports = {
    getReport,
    getOneReport,
    addProduction,
    getMostRecentReport,
    updateReportProduction,
    updateOneReport,
    downloadreport,
    opireport,
    opiGetReport,
    downloadreportOpi,
    deleteReport,
    deleteReportProduction,
    deleteReportExternal

}



