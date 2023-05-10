const DataTypes = require('sequelize')
const db = require('../database/connection')
const Status = require('./status')

const FuelTaxHistory = db.define('fuel_tax_histories', {
    user_id: {
        type: DataTypes.NUMBER
    },
    status_id: {
        type: DataTypes.NUMBER
    },
    date: {
        type: DataTypes.DATE
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
    fuel_tax_histories_details: {
        type: DataTypes.VIRTUAL
    }
})

FuelTaxHistory.belongsTo(Status, { foreignKey: 'status_id' })

FuelTaxHistory.prototype.toJSON = function () {
    const { createdAt, updatedAt, user_id, status_id, ...fuelTaxHistory } = Object.assign({}, this.get());
    return fuelTaxHistory;
}

module.exports = FuelTaxHistory