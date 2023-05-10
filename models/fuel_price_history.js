const DataTypes = require('sequelize')
const db = require('../database/connection')
const Fuel = require('./fuel')

const FuelPriceHistory = db.define('fuel_price_histories', {
    id: {
        type: DataTypes.NUMBER,
        primaryKey: true
    },
    fuel_id: {
        type: DataTypes.NUMBER
    },
    user_id: {
        type: DataTypes.NUMBER
    },
    sale_price: {
        type: DataTypes.DECIMAL
    },
    purchase_price: {
        type: DataTypes.DECIMAL
    },
    observation: {
        type: DataTypes.STRING
    },
    status_id: {
        type: DataTypes.NUMBER
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn('now')
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn('now')
    },
})

FuelPriceHistory.belongsTo(Fuel, { foreignKey: 'fuel_id' })

FuelPriceHistory.prototype.toJSON = function () {
    const { fuel_id, ...fuel_price_history } = Object.assign({}, this.get());
    return fuel_price_history;
}

module.exports = FuelPriceHistory