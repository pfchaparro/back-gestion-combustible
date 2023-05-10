const DataTypes = require('sequelize')
const db = require('../database/connection')

const SaleFuel = db.define('sale_fuels', {
    id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATE
    },
    user_id: {
        type: DataTypes.NUMBER
    },
    status_id: {
        type: DataTypes.NUMBER
    },
    observation: {
        type: DataTypes.STRING
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn('now')
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn('now')
    },
    sales: {
        type: DataTypes.VIRTUAL
    },
})

SaleFuel.prototype.toJSON = function () {
    const { createdAt, updatedAt, user_id,  ...sale_fuel } = Object.assign({}, this.get());
    return sale_fuel;
}

module.exports = SaleFuel