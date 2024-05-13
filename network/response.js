exports.success = function (req, res, data, status) {
    res.status(status).send({
        status: status,
        body: data
    })
}

exports.error = function (req, res, error, status, details, data) {
    console.error(`Desde el servidor se obtiene el siguiente error: ${details}`);
    res.status(status).send({
        status: status,        
        error: error,
        detail: details,
        body: data        
    })

}