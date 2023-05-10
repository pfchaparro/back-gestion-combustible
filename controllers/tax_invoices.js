const { response, request } = require('express')
const { Fuel, Tax, TaxInvoice } = require('../models')

const getTaxInvoices = async (req = response, res = request) => {
    try {
        const fuels = await Fuel.findAndCountAll({
        })

        for (const fuel of fuels.rows) {
            const taxes = await TaxInvoice.findAll({
                include: [
                    { model: Tax, required: true }
                ],
                where: {
                    fuel_id: fuel.id
                }
            })
            fuel.taxes = taxes
        }

        res.json({
            fuels
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: 'Error al realizar la petición'
        })
    }
}

module.exports = {
    getTaxInvoices
}