const Role = require('../models/role')
const { TypeDocument, User } = require('../models')

const validatedRole = async (role_id = '') => {
    const role_exist = await Role.findOne({
        where: {
            id: role_id
        }
    })

    if (!role_exist) {
        throw new Error(`El rol ${role_id} no está registrado`)
    }
}

const validatedTypeDocument = async (type_document_id = '') => {
    const type_document_exist = await TypeDocument.findOne({
        where: {
            id: type_document_id
        }
    })

    if (!type_document_exist) {
        throw new Error(`El tipo de documento ${type_document_id} no está registrado`)
    }
}

const validatedDocument = async (document = '') => {
    const document_exists = await User.findOne({
        where: {
            document: document
        }
    })

    if (document_exists) {
        throw new Error(`El documento ${document} ya se encuentra registrado`)
    }
}

const validatedId = async (id = '') => {

    const user = await User.findByPk(id)

    if (!user) {
        throw new Error(`No existe un usuario con el id ${id}`)
    }
}

module.exports = { validatedRole, validatedTypeDocument, validatedDocument, validatedId }