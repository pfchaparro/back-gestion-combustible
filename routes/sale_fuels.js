const { Router } = require('express')
const { getSaleFuels, postSaleFuels, putSaleFuels, getSaleFuelReport3 } = require('../controllers/sale_fuels')
const { check, query } = require('express-validator')
const { ValidatorFiels, validatorJWT } = require('../middlewares')

const router = Router()

router.get('/', [
    validatorJWT
], getSaleFuels)

router.post('/', [
    validatorJWT,
    check('date', 'La fecha debe ser valida').isDate().not().isEmpty(),
    check('fuels', 'Los combustibles deben ser validos').isArray().not().isEmpty(),
    ValidatorFiels
], postSaleFuels)

router.put('/:id', [
    validatorJWT,
    check('date', 'La fecha debe ser valida').isDate().not().isEmpty(),
    check('fuels', 'Los combustibles deben ser validos').isArray().not().isEmpty(),
    check('observation', 'La observacion no es valida').not().isEmpty().isLength({ max: 255 }),
    ValidatorFiels
], putSaleFuels)

router.get('/report3/', [
    validatorJWT,
    query("start", "El valor de 'start' debe ser una fecha valida").isDate().not().isEmpty(),
    query("end", "El valor de 'end' debe ser una fecha valida").isDate().not().isEmpty(),
    ValidatorFiels,
], getSaleFuelReport3)

module.exports = router