const DataTypes = require('sequelize')
const db = require('../database/connection')
const Fuel = require('./fuel')
const Tax = require('./tax')
const FuelTaxHistoryDetail = db.define('fuel_tax_history_details', {
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
    },
}, { timestamps: false })

FuelTaxHistoryDetail.belongsTo(Fuel, { foreignKey: 'fuel_id' })
FuelTaxHistoryDetail.belongsTo(Tax, { foreignKey: 'tax_id' })

FuelTaxHistoryDetail.prototype.toJSON = function () {
    const { fuel_tax_histories_id, fuel_id, tax_id, ...fuelTaxHistoryDetails } = Object.assign({}, this.get());
    return fuelTaxHistoryDetails;
}

module.exports = FuelTaxHistoryDetail