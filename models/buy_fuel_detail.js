const DataTypes = require('sequelize')
const db = require('../database/connection')
const BuyFuel = require('./buy_fuel')
const Fuel = require('./fuel')

const buyFuelDetails = db.define('buy_fuel_details', {
    id: {
        type: DataTypes.NUMBER,
        primaryKey: true
    },
    buy_fuel_id: {
        type: DataTypes.NUMBER
    },
    fuel_id: {
        type: DataTypes.NUMBER
    },
    status_id: {
        type: DataTypes.NUMBER
    },
    count: {
        type: DataTypes.DECIMAL
    },
    unit_value: {
        type: DataTypes.DECIMAL
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn('now')
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn('now')
    },
    fuel_name: {
        type: DataTypes.VIRTUAL
    },
    date_inovice: {
        type: DataTypes.VIRTUAL
    },
    bill_number: {
        type: DataTypes.VIRTUAL
    },
})

buyFuelDetails.belongsTo(Fuel, { foreignKey: 'fuel_id' })
buyFuelDetails.belongsTo(BuyFuel, { foreignKey: 'buy_fuel_id' })

buyFuelDetails.prototype.toJSON = function () {
    const { buy_fuel_id, fuel_id, createdAt, updatedAt,  ...buy_fuel_details } = Object.assign({}, this.get());
    return buy_fuel_details;
}

module.exports = buyFuelDetails