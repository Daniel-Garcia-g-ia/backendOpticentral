const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../../network/response')


router.get('/equipments', function (req, res) {

    controller.getEquipments(req, res)
        .then((result) => {
            response.success(req, res, result, 200)

        }).catch((err) => {
            response.error(req, res, 'Error al procesar solictud', err.status, err.message, err.authDenied)

        });

})


module.exports = router;

