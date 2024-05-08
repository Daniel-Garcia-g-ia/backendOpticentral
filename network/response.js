exports.succes = function (req, res, users, status) {
    res.status(status).send({
        status: status,
        body: users
    })
}

exports.error = function (req, res, error, status, details) {
    console.error(`Desde el servidor se obtiene el siguiente error: ${details}`);
    res.status(status).send({
        status: status,
        error: error
    })

}