const DataTypes = require('sequelize')
const db = require('../database/connection')

const Module = db.define('modules', {
    id: {
        type: DataTypes.NUMBER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    icon: {
        type: DataTypes.STRING
    },
    status_id: {
        type: DataTypes.NUMBER
    }
}, { timestamps: false })

module.exports = Module