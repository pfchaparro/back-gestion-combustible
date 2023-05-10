const { response, request } = require('express')
const { SaleFuel, Fuel, SaleFuelDetail } = require('../models')
const jwt = require('jsonwebtoken')
const Sequelize = require('sequelize');
const op = Sequelize.Op;
const { QueryTypes } = require('sequelize')
const db = require('../database/connection')

const getSaleFuels = async (req = response, res = request) => {
    try {
        const sale_fuels = await SaleFuel.findAndCountAll({})

        for (const sale_fuel of sale_fuels.rows) {
            sale_fuel.sales = await SaleFuelDetail.findAll({
                include: [
                    { model: Fuel, required: true }
                ],
                where: {
                    sale_fuel_id: sale_fuel.id,
                    status_id: 1
                }
            })
        }

        res.json({
            sale_fuels
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: 'Error al realizar la petición'
        })
    }
}

const postSaleFuels = async (req = request, res = response) => {
    try {
        const { date, fuels } = req.body
        const token = req.header('Authorization')
        const { id } = jwt.verify(token, process.env.SECRET_KEY)
        const user_id = id

        const date_sale_fuel = await SaleFuel.findOne({
            where: {
                date: new Date(date)
            }
        })

        if (date_sale_fuel) {
            return res.status(404).json({
                msg: 'Las ventas para está fecha ya se encuentran registrados'
            })
        }

        const sale_fuel = await SaleFuel.create({
            date,
            status_id: 1,
            user_id
        })

        await sale_fuel.save()

        for (const fuel of fuels) {
            const count = fuel.count
            const fuel_id = fuel.id

            const sale_fuel_details = await SaleFuelDetail.create({
                sale_fuel_id: sale_fuel.id,
                fuel_id,
                count,
                status_id: 1,
            })

            await sale_fuel_details.save()
        }

        res.json({
            msg: `Se ha creado la compra de combustible correctamente`,
            date
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: 'Error al realizar la petición'
        })
    }
}

const putSaleFuels = async (req, res = response) => {

    try {
        const { date, observation, fuels } = req.body
        const token = req.header('Authorization')
        const { id } = jwt.verify(token, process.env.SECRET_KEY)
        const user_id = id
        const sale_fuel_id = req.params.id

        const sale_fuel = await SaleFuel.findOne({
            where: {
                id: sale_fuel_id
            }
        })

        if (!sale_fuel) {
            return res.status(404).json({
                msg: 'El id de la compra de combustible no es valido'
            })
        }

        await SaleFuel.update(
            {
                date,
                user_id,
                observation
            }, { where: { id: sale_fuel_id } })

        await SaleFuelDetail.update(
            {
                status_id: 2,
            }, { where: { sale_fuel_id } })

        for (const fuel of fuels) {
            const count = fuel.count
            const fuel_id = fuel.fuel.id

            const sale_fuel_details = await SaleFuelDetail.create({
                sale_fuel_id: sale_fuel.id,
                fuel_id,
                count,
                status_id: 1,
            })

            await sale_fuel_details.save()
        }

        res.json({
            msg: `Se ha actualizado la compra de combustible correctamente`,
            date
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: 'Error al realizar la petición'
        })
    }
}

const getSaleFuelReport3 = async (req = response, res = request) => {
    try {
        const { start, end } = req.query

        const sale_fuels_details = await db.query("select sf.`date` as date_sale, f.name as fuel_name, sfd.count as count from sale_fuel_details sfd inner join sale_fuels sf on sf.id = sfd.sale_fuel_id inner join fuels f ON f.id = sfd.fuel_id where sfd.status_id  = 1 and sf.`date` BETWEEN :start and :end order by sf.`date` ASC",
            {
                replacements: { start, end },
                type: QueryTypes.SELECT
            });

        const totals = await db.query("select f.name as fuel_name, sum(sfd.count) as total_count  from sale_fuel_details sfd inner join sale_fuels sf on sf.id = sfd.sale_fuel_id inner join fuels f on f.id = sfd.fuel_id where sfd.status_id  = 1 and sf.date BETWEEN :start and :end GROUP by sfd.fuel_id",
            {
                replacements: { start, end },
                type: QueryTypes.SELECT
            });

        SaleFuelDetail.prototype.toJSON = function () {
            const { fuel, sale_fuel, ...sale_fuels_details } = Object.assign({}, this.get());
            return sale_fuels_details;
        }

        res.json({
            sale_fuels_details,
            totals
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: 'Error al realizar la petición'
        })
    }
}

module.exports = {
    getSaleFuels,
    postSaleFuels,
    putSaleFuels,
    getSaleFuelReport3
}