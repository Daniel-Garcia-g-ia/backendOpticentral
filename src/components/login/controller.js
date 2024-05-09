const store = require('./storage');
const ENV = require('../../../config');

function getUsers() {
    return new Promise((resolve, reject) => {
        store.getUsers()
            .then((users) => {
                resolve(users)

            }).catch(e => {
                reject(e)
            })
    })
}

function loginUser(req, res) {
    return new Promise((resolve, reject) => {
        const { email, password } = req.body;
        store.getOneUser(email).then((user) => {
            if (!user) {
                // No encuentra el usuario, rechaza la promesa
                reject({ status: 401, message: 'Usuario no encontrado' });
            } else {
                // Si encuentra el usuario, verifica la contraseña
                if (user.password !== password) {
                    reject({ status: 401, message: 'Contraseña incorrecta' })
                } else {
                    resolve(user)
                }
            }
        }).catch((e) => {
            reject({ status: 500, message: 'Error al obtener el usuario', error: e.message })
        })
    })
}

module.exports = {
    getUsers,
    loginUser
}