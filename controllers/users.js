const { response, request } = require('express')
const bcryptjs = require('bcryptjs')
const { Role, TypeDocument, Status, User, RoleModule, Module } = require('../models')
const { generatedJWT } = require('../helpers/generated-jwt')

const getUsers = async (req = response, res = request) => {

    const { limit, offset } = req.query
    const config = {
        include: [
            { model: Role, required: false },
            { model: TypeDocument, required: true },
            { model: Status, required: true }
        ]
    }

    let users = []

    try {
        if (Number(limit) == 0 && Number(offset) == 0) {
            users = await User.findAndCountAll(config)
        } else {
            config.limit = Number(limit);
            config.offset = Number(offset);
            users = await User.findAndCountAll(config)
        }

        res.json({
            users
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: 'Error al realizar la petición'
        })
    }
}

const postUsers = async (req = request, res = response) => {
    try {
        const { document, type_document_id, name, last_name, email, cellphone, password, role_id } = req.body

        const user = await User.create({
            document,
            type_document_id,
            name,
            last_name,
            email,
            cellphone,
            password,
            role_id
        })

        const salt = bcryptjs.genSaltSync()
        user.password = bcryptjs.hashSync(password, salt)

        await user.save()

        res.json({
            msg: 'El usuario se ha creado correctamente',
            user
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: 'Error al realizar la petición'
        })
    }
}

const putUsers = async (req, res = response) => {

    try {
        const { id } = req.params
        const { type_document_id, name, last_name, email, cellphone, password, role_id } = req.body

        const user = await User.findByPk(id)

        await user.update({
            type_document_id,
            name,
            last_name,
            email,
            cellphone,
            password,
            role_id
        });

        res.json({
            msg: 'El usuario se ha actualizado correctamente',
            user
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: 'Error al realizar la petición'
        })
    }
}

const loginUser = async (req, res = response) => {

    const config = {
        include: [
            {
                model: Role, required: false,
                include: [
                    {
                        model: RoleModule, required: true, include: [
                            { model: Module, required: false }
                        ]
                    }
                ]
            },
            { model: TypeDocument, required: true },
            { model: Status, required: true }
        ]
    }

    const { document, password } = req.body

    try {
        config.where = {
            document
        };

        const user = await User.findOne(config)

        if (!user) {
            return res.status(404).json({
                msg: 'El usuario o contraseña no es valido'
            })
        }

        if (user.status.id == 2) {
            return res.status(400).json({
                msg: 'El usuario se encuentra inactivo, comuniquese con el administrador'
            })
        }

        const validPassword = bcryptjs.compareSync(password, user.password)

        if (!validPassword) {
            return res.status(404).json({
                msg: 'El usuario o contraseña no es valido'
            })
        }

        const token = await generatedJWT(user.id)

        await user.update({
            token
        });

        res.json({
            user,
            token
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: 'Error al realizar la petición'
        })
    }
}

const logoutUser = async (req, res = response) => {

    const { id } = req.params

    try {
        const user = await User.findByPk(id)

        if (!user) {
            return res.status(404).json({
                msg: 'El usuario no es valido'
            })
        }

        if (user.status == 2) {
            return res.status(400).json({
                msg: 'El usuario se encuentra inactivo, comuniquese con el administrador'
            })
        }

        const token = null

        await user.update({
            token
        });

        res.json({
            msg: 'Se ha cerrado sesión correctamente'
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: 'Error al realizar la petición'
        })
    }
}

const patchUsers = async (req, res = response) => {

    try {
        const { status_id } = req.body
        const { id } = req.params
        const user = await User.findByPk(id)

        await user.update({
            status_id
        });

        res.json({
            msg: 'El estado usuario se ha actualizado correctamente',
            user
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: 'Error al realizar la petición'
        })
    }
}

const getRoles = async (req = response, res = request) => {
    try {
        const config = {
            include: [
                {
                    model: RoleModule, required: true, include: [
                        { model: Module, required: false }
                    ]
                }
            ]
        }


        const roles = await Role.findAndCountAll(config)
        res.json({
            roles
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: 'Error al realizar la petición'
        })
    }
}

const getTypeDocument = async (req = response, res = request) => {
    try {
        const type_document = await TypeDocument.findAndCountAll()
        res.json({
            type_document
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: 'Error al realizar la petición'
        })
    }
}


module.exports = {
    getUsers,
    postUsers,
    putUsers,
    loginUser,
    logoutUser,
    patchUsers,
    getRoles,
    getTypeDocument
}