const { Router } = require('express')
const { postFuelTaxes, putFuelTaxes, getFuelTaxes, getFuelTaxesById, getFuelTaxesAll, getReport4 } = require('../controllers/fuel_taxes')
const { check, query } = require('express-validator')
const { ValidatorFiels, validatorJWT } = require('../middlewares')

const router = Router()

router.post('/', [
    validatorJWT,
    check('date', 'La fecha debe ser valida').isDate().not().isEmpty(),
    check('fuels_taxes', 'Los impuestos de los combustibles deben ser validos').isArray().not().isEmpty(),
    ValidatorFiels
], postFuelTaxes)

router.put('/:id', [
    validatorJWT,
    check('id', 'El id no es valido').isNumeric().isLength({ min: 1 }),
    check('date', 'La fecha debe ser valida').isDate().not().isEmpty(),
    check('fuels_taxes', 'Los impuestos de los combustibles deben ser validos').isArray().not().isEmpty(),
    check('observation', 'La observacion no es valida').not().isEmpty().isLength({ max: 255 }),
    ValidatorFiels
], putFuelTaxes)

router.get('/all', [
    validatorJWT
], getFuelTaxesAll)

router.get('/', [
    validatorJWT
], getFuelTaxes)

router.get('/report4/', [
    validatorJWT,
    query("start", "El valor de 'start' debe ser una fecha valida").isDate().not().isEmpty(),
    query("end", "El valor de 'end' debe ser una fecha valida").isDate().not().isEmpty(),
    ValidatorFiels,
], getReport4)

router.get('/:id', [
    validatorJWT,
    check('id', 'El id no es valido').isNumeric().isLength({ min: 1 }),
    ValidatorFiels
], getFuelTaxesById)

module.exports = router