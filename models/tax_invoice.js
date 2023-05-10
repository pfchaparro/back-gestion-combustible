const DataTypes = require('sequelize')
const db = require('../database/connection')
const Fuel = require('./fuel')
const Tax = require('./tax')

const TaxInvoice = db.define('tax_invoices', {
    fuel_tax_histories_id: {
        type: DataTypes.NUMBER
    },
    fuel_id: {
        type: DataTypes.NUMBER
    },
    tax_id: {
        type: DataTypes.NUMBER
    },
    value: {
        type: DataTypes.DECIMAL
    }
}, { timestamps: false })

TaxInvoice.belongsTo(Fuel, { foreignKey: 'fuel_id' })
TaxInvoice.belongsTo(Tax, { foreignKey: 'tax_id' })

TaxInvoice.prototype.toJSON = function () {
    const { fuel_id, tax_id, ...taxInvoice } = Object.assign({}, this.get());
    return taxInvoice;
}


module.exports = TaxInvoice