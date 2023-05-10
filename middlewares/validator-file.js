const ValidatorFiles = (req, res = response, next) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.attached) {
        return res.status(500).json({
            msg: 'No se encontrarón archivos para cargar.'
        })
    }

    next()
}
module.exports = { ValidatorFiles }