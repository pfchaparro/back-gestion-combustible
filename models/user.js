const DataTypes = require('sequelize')
const db = require('../database/connection')
const Role = require('./role')
const TypeDocument = require('./type_document')
const Status = require('./status')

const User = db.define('users', {
    document: {
        type: DataTypes.STRING
    },
    type_document_id: {
        type: DataTypes.NUMBER
    },
    name: {
        type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    cellphone: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    role_id: {
        type: DataTypes.NUMBER
    },
    status_id: {
        type: DataTypes.NUMBER,
        defaultValue: 1
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn('now')
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn('now')
    }
})

User.belongsTo(Role, { foreignKey: 'role_id' })
User.belongsTo(TypeDocument, { foreignKey: 'type_document_id' })
User.belongsTo(Status, { foreignKey: 'status_id' })

User.prototype.toJSON = function () {
    const { password, createdAt, updatedAt, token, role_id, type_document_id, status_id, ...user } = Object.assign({}, this.get());
    return user;
}

module.exports = User