const { Router } = require('express')
const { getFuelPrices, postFuelPrices } = require('../controllers/fuel_prices')
const { check } = require('express-validator')
const { ValidatorFiels, validatorJWT } = require('../middlewares')

const router = Router()

router.post('/:id', [
    validatorJWT,
    check('id', 'El id no es valido').isNumeric().isLength({ min: 1 }),
    check('sale_price', 'El precio de venta no es valido').isNumeric().isLength({ min: 1 }),
    check('observation', 'La observacion no es valida').not().isEmpty().isLength({ max: 255 }),
    ValidatorFiels
], postFuelPrices)

router.get('/', [
    validatorJWT
], getFuelPrices)


module.exports = router