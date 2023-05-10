const DataTypes = require('sequelize')
const db = require('../database/connection')

const TypeDocument = db.define('type_document', {
    id: {
        type: DataTypes.NUMBER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    }
}, { timestamps: false })

module.exports = TypeDocument