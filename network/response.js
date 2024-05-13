exports.success = function (req, res, users, status) {
    res.status(status).send({
        status: status,
        body: users
    })
}

exports.error = function (req, res, error, status, details, data) {
    console.error(`Desde el servidor se obtiene el siguiente error: ${details}`);
    console.log(data)
    res.status(status).send({
        status: status,        
        error: error,
        detail: details,
        body: data        
    })

}