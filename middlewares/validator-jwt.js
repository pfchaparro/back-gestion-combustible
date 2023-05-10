const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validatorJWT = async (req = request, res = response, next) => {

    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({
            msg: 'No se encuentra un token valido en la petición'
        })
    }
    try {
        const { id } = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findByPk(id)

        if (!user) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe'
            })
        }

        if (user.status_id == 2) {
            return res.status(401).json({
                msg: 'Token no válido - usuario se encuentra inactivo'
            })
        }

        if (user.token != token) {
            return res.status(401).json({
                msg: 'Token no válido - El token está caducado, inicie sesión nuevamente.'
            })
        }

        req.user = user
        req.id = id

        next()

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido, inicie sesión.'
        })

    }
}



module.exports = { validatorJWT }