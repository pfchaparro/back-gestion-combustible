const DataTypes = require('sequelize')
const db = require('../database/connection')

const Fuel = db.define('fuels', {
    id: {
        type: DataTypes.NUMBER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    status_id: {
        type: DataTypes.NUMBER
    },
    unit_measurement_id: {
        type: DataTypes.NUMBER
    },
    evaporation_percentage: {
        type: DataTypes.DECIMAL
    },
    sale_price: {
        type: DataTypes.DECIMAL
    },
    purchase_price: {
        type: DataTypes.DECIMAL
    },
    taxes: {
        type: DataTypes.VIRTUAL
    }
}, { timestamps: false })

module.exports = Fuel