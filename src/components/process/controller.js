const storage = require('./storage');
const jwt = require('../../jwt');

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
                const turn = req.params.turn


                storage.getOne(equipmentId, date, turn)
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

module.exports = {
    getReport,
    getOneReport,
    addProduction,
    getMostRecentReport
}



