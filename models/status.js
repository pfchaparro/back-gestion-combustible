const DataTypes = require('sequelize')
const db = require('../database/connection')

const Status = db.define('status', {
    name: {
        type: DataTypes.STRING
    }
}, { timestamps: false })

module.exports = Status