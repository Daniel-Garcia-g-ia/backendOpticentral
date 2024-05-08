const express = require('express');
const router = express.Router();
const ENV = require('../../../config');
const controller= require('./controller')
const response = require('../../../network/response')



router.get('/', function (req, res) {
    controller.getUsers()
        .then((users) =>
            response.succes(req, res, users, 200))
        .catch(e=>{
            response.error(req, res, 'No se pudo obtener toda la informacion', 400, 'Error en Callback Informacion') 
        })
        
    })




module.exports= router;