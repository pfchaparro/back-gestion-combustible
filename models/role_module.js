const DataTypes = require('sequelize')
const db = require('../database/connection')
const Module = require('./module')

const RoleModule = db.define('role_modules', {
    id: {
        type: DataTypes.NUMBER,
        primaryKey: true
    },
    role_id: {
        type: DataTypes.NUMBER
    },
    module_id: {
        type: DataTypes.NUMBER
    },
    permissions: {
        type: DataTypes.NUMBER
    }
}, { timestamps: false })

RoleModule.belongsTo(Module, { foreignKey: 'module_id' })

RoleModule.prototype.toJSON = function () {
    const { role_id, module_id, ...role_module } = Object.assign({}, this.get());
    return role_module;
}

module.exports = RoleModule