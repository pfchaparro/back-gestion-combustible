const DataTypes = require('sequelize')
const db = require('../database/connection')

const Tax = db.define('taxes', {
    id: {
        type: DataTypes.NUMBER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    order: {
        type: DataTypes.NUMBER
    },
    status_id: {
        type: DataTypes.NUMBER
    },
    fuels: {
        type: DataTypes.VIRTUAL
    },
}, { timestamps: false })

module.exports = Tax