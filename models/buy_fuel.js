const DataTypes = require('sequelize')
const db = require('../database/connection')

const BuyFuel = db.define('buy_fuels', {
    id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.NUMBER
    },
    status_id: {
        type: DataTypes.NUMBER
    },
    date: {
        type: DataTypes.DATE
    },
    bill_number: {
        type: DataTypes.STRING
    },
    iva: {
        type: DataTypes.DECIMAL
    },
    tax: {
        type: DataTypes.DECIMAL
    },
    dynamax: {
        type: DataTypes.DECIMAL
    },
    other_concepts: {
        type: DataTypes.DECIMAL
    },
    sub_total: {
        type: DataTypes.DECIMAL
    },
    total: {
        type: DataTypes.DECIMAL
    },
    observation: {
        type: DataTypes.STRING
    },
    attached: {
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
    fuels: {
        type: DataTypes.VIRTUAL
    }
})

BuyFuel.prototype.toJSON = function () {
    const { user_id, createdAt, updatedAt, ...buy_fuel } = Object.assign({}, this.get());
    return buy_fuel;
}

module.exports = BuyFuel