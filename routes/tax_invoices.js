const { Router } = require('express')
const { getTaxInvoices } = require('../controllers/tax_invoices')
const { validatorJWT } = require('../middlewares')

const router = Router()

router.get('/', [
    validatorJWT
], getTaxInvoices)

module.exports = router