const store = require('./storage');
const ENV = require('../../../config');
const jwt = require('../../jwt')

function getUsers(req, res) {
    const token = req.headers['x-access-token'];   

    return new Promise((resolve, reject) => {
        const authDenied = {
            auth:false,
            token:"none"
        }
        
        if (!token) {
            reject({status:401 , message:'Sin token de acceso'}, authDenied);
           
        } else {
            jwt.verifyToken(token)
                .then((decoded) => {
                    store.getUsers()
                        .then((users) => {
                            resolve(users);
                        })
                        .catch((e) => {
                            reject(e);
                        });
                })
                .catch((e) => {
                    const data = {
                        auth:false
                    }                    
                    reject({status: 401, message: 'Token Incorrecto', authDenied });
                });
        }
    });
}

function loginUser(req, res) {
    return new Promise((resolve, reject) => {
        const authDenied = {
            auth:false,
            token:"none"
        }
        const { email, password } = req.body;
        store.getOneUser(email).then((user) => {
            if (!user) {
                // No encuentra el usuario, rechaza la promesa
                reject({ status: 401, message: 'Usuario no encontrado', authDenied });
            } else {
                // Si encuentra el usuario, verifica la contraseña
                if (user.password !== password) {                                 
                    reject({ status: 401, message: 'Contraseña incorrecta', authDenied  })
                } else {
                    const token = jwt.generateToken(user._id)
                    const userData = {
                        auth: true,
                        name: user.name,
                        role: user.role,
                        token: token
                    }
                    resolve(userData)
                }
            }
        }).catch((e) => {           
            reject({ status: 500, message: 'Error al obtener el usuario', error: e.message, authDenied })
        })
    })
}

module.exports = {
    getUsers,
    loginUser
}