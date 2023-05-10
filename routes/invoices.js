const { Router } = require('express')
const { postInvoices, putInvoices, getInvoices, getInvoicesReport1, getInvoicesReport2, getInvoicesById, uploadInvoices, getUploadInvoices } = require('../controllers/invoices')
const { check, query } = require('express-validator')
const { ValidatorFiels, validatorJWT, ValidatorFiles } = require('../middlewares')

const router = Router()

router.post('/', [
    validatorJWT,
    check('date', 'La fecha debe ser valida').isDate().not().isEmpty(),
    check('bill_number', 'El Número de la factura no es valido').not().isEmpty().isLength({ min: 1, max: 20 }),
    check('iva', 'El iva no es valido').isNumeric().isLength({ min: 1 }),
    check('tax', 'El impuesto no es valido').isNumeric().isLength({ min: 1 }),
    check('dynamax', 'El dinamax no es valido').isNumeric().isLength({ min: 1 }),
    check('other_concepts', 'Los otros conceptos no es valido').isNumeric().isLength({ min: 1 }),
    check('sub_total', 'El subtotal no es valido').isNumeric().isLength({ min: 1 }),
    check('total', 'El total no es valido').isNumeric().isLength({ min: 1 }),
    check('fuels', 'Los combustibles deben ser validos').isArray().not().isEmpty(),
    ValidatorFiels
], postInvoices)

router.put('/:id', [
    validatorJWT,
    check('id', 'El id no es valido').isNumeric().isLength({ min: 1 }),
    check('date', 'La fecha debe ser valida').isDate().not().isEmpty(),
    check('bill_number', 'El Número de la factura no es valido').not().isEmpty().isLength({ min: 1, max: 20 }),
    check('iva', 'El iva no es valido').isNumeric().isLength({ min: 1 }),
    check('tax', 'El impuesto no es valido').isNumeric().isLength({ min: 1 }),
    check('dynamax', 'El dinamax no es valido').isNumeric().isLength({ min: 1 }),
    check('other_concepts', 'Los otros conceptos no es valido').isNumeric().isLength({ min: 1 }),
    check('sub_total', 'El subtotal no es valido').isNumeric().isLength({ min: 1 }),
    check('total', 'El total no es valido').isNumeric().isLength({ min: 1 }),
    check('observation', 'La observacion no es valida').not().isEmpty().isLength({ max: 255 }),
    check('fuels', 'Los combustibles deben ser validos').isArray().not().isEmpty(),
    ValidatorFiels
], putInvoices)

router.get('/', [
    validatorJWT
], getInvoices)

router.get('/report1/', [
    validatorJWT,
    query("start", "El valor de 'start' debe ser una fecha valida").isDate().not().isEmpty(),
    query("end", "El valor de 'end' debe ser una fecha valida").isDate().not().isEmpty(),
    ValidatorFiels,
], getInvoicesReport1)

router.get('/report2/', [
    validatorJWT,
    query("start", "El valor de 'start' debe ser una fecha valida").isDate().not().isEmpty(),
    query("end", "El valor de 'end' debe ser una fecha valida").isDate().not().isEmpty(),
    ValidatorFiels,
], getInvoicesReport2)

router.get('/:id', [
    validatorJWT,
    check('id', 'El id no es valido').isNumeric().isLength({ min: 1 }),
    ValidatorFiels
], getInvoicesById)

router.post('/upload/:id', [
    check('id', 'El id no es valido').isNumeric().isLength({ min: 1 }),
    validatorJWT,
    ValidatorFiles
], uploadInvoices)

router.get('/upload/:id', [
    check('id', 'El id no es valido').isString().isLength({ min: 1 }),
    validatorJWT
], getUploadInvoices)


module.exports = router