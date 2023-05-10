const DataTypes = require('sequelize')
const db = require('../database/connection')
const RoleModule = require('./role_module')

const Role = db.define('roles', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    status_id: {
        type: DataTypes.NUMBER
    }
}, { timestamps: false })

Role.hasMany(RoleModule, { foreignKey: 'role_id' })

Role.prototype.toJSON = function () {
    const { status_id, ...role } = Object.assign({}, this.get());
    return role;
}

module.exports = Role