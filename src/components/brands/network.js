const express= require('express');
const router = express.Router();
const controller = require('./controller')
const response = require('../../../network/response')


router.get('/brands', function (req, res) {

    controller.get(req, res)
        .then((result) => {
            response.success(req, res, result, 200)
        }).catch((err)=>{
            response.error(req,res,'Error al procesar solicitud', err.status, err.message, err.authDenied)
        })
})

module.exports = router