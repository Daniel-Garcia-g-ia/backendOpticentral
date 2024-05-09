const express = require('express');
const router = express.Router();
const ENV = require('../../../config');
const controller = require('./controller')
const response = require('../../../network/response')



router.get('/login', function (req, res) {
    controller.getUsers()
        .then((users) =>
            response.success(req, res, users, 200))
        .catch(e => {
            response.error(req, res, 'No se pudo obtener toda la informacion', 400, 'Error en Callback Informacion')
        })

})
router.post('/loginUser', function (req, res) {

    if (!req.body || Object.keys(req.body).length === 0) {
        return response.error(req, res, "Error, el cuerpo de la solcitud está vacío", 500 )

    } else {
        controller.loginUser(req, res)
            .then((result) => {
                return response.success(req, res, result, 200);
            }).catch((e) => {
                return response.error(req, res, 'Error al procesar la solicitud', 500, e.message)
            })
    }


})




module.exports = router;