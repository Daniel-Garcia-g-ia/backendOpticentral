const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../../network/response')


router.get('/processData', function (req, res) {


    controller.getReport(req, res)
        .then((result) => {
            response.success(req, res, result, 200)
        }).catch((err) => {
            response.error(req, res, 'Error al procesar solictud', err.status, err.message, err.authDenied)
        })

})

router.get('/processData/:equipmentId/:date', function (req, res) {

    controller.getOneReport(req, res)
        .then((result) => {
            response.success(req, res, result, 200)
        }).catch((err) => {
            response.error(req, res, 'Error al procesar solictud', err.status, err.message, err.authDenied)
        })

})

router.post('/processData/addProduction', function (req, res) {

    controller.addProduction(req, res)
        .then((result) => {
            response.success(req, res, result, 200)
        }).catch((err) => {
            response.error(req, res, 'Error al procesar la solcitud', err.status, err.message, err.authDenied)
        })
})

router.get('/mostRecentReport/:equipmentId', function (req, res) {


    controller.getMostRecentReport(req, res)
        .then((result) => {
            response.success(req, res, result, 200)
        }).catch((err) => {
            response.error(req, res, 'Error al procesar solictud', err.status, err.message, err.authDenied)
        })

})

router.put('/updateData/:id', function (req, res) {
    controller.updateReportProduction(req, res)
        .then((result) => {
            response.success(req, res, result, 200);
        })
        .catch((err) => {
            response.error(req, res, 'Error al procesar solicitud', err.status, err.message, err.authDenied);
        });
});

router.put('/updateData/report/:id', function (req, res) {

    controller.updateOneReport(req, res)
        .then((result) => {
            response.success(req, res, result, 200);
        })
        .catch((err) => {
            response.error(req, res, 'Error al procesar solicitud', err.status, err.message, err.authDenied);
        });
});

router.post('/download', function (req, res) {
    
    controller.downloadreport(req, res)
        .then((result) => { 
                      
            response.success(req, res, result, 200);
        })
        .catch((err) => {
            response.error(req, res, 'Error al procesar informacion', err.status, err.message, err.authDenied)
        })
})
router.post('/download-opi', function (req, res) {
    
    controller.downloadreportOpi(req, res)
        .then((result) => { 
                      
            response.success(req, res, result, 200);
        })
        .catch((err) => {
            response.error(req, res, 'Error al procesar informacion', err.status, err.message, err.authDenied)
        })
})
router.post('/opi-report', function (req, res) {
    
    controller.opireport(req, res)
        .then((result) => { 
                      
            response.success(req, res, result, 200);
        })
        .catch((err) => {
            response.error(req, res, 'Error al procesar informacion', err.status, err.message, err.authDenied)
        })
})
router.get('/opi-report-consult/:equipmentId/:date/:turn',function(req,res){
    controller.opiGetReport(req,res)
        .then((result) => { 
                      
            response.success(req, res, result, 200);
        })
        .catch((err) => {
            response.error(req, res, 'Error al procesar informacion', err.status, err.message, err.authDenied)
        })
    

})





module.exports = router;