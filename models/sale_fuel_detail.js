const DataTypes = require('sequelize')
const db = require('../database/connection')
const Fuel = require('./fuel')
const SaleFuel = require('./sale_fuel')

const SaleFuelDetail = db.define('sale_fuel_details', {
    id: {
        type: DataTypes.NUMBER,
        primaryKey: true
    },
    sale_fuel_id: {
        type: DataTypes.NUMBER
    },
    fuel_id: {
        type: DataTypes.NUMBER
    },
    count: {
        type: DataTypes.DECIMAL
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
    fuel_name: {
        type: DataTypes.VIRTUAL
    },
    date_sale: {
        type: DataTypes.VIRTUAL
    }
})

SaleFuelDetail.belongsTo(Fuel, { foreignKey: 'fuel_id' })
SaleFuelDetail.belongsTo(SaleFuel, { foreignKey: 'sale_fuel_id' })

SaleFuelDetail.prototype.toJSON = function () {
    const { fuel_id, createdAt, updatedAt, sale_fuel_id, ...sale_fuel_details } = Object.assign({}, this.get());
    return sale_fuel_details;
}

module.exports = SaleFuelDetail