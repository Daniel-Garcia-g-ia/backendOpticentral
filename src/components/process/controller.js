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

module.exports = {
    getReport
}



