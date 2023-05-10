const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const { Fuel, BuyFuel, BuyFuelDetail } = require('../models')
const { uploadDocuments } = require('../helpers')
const path = require('path')
const fs = require('fs')
const Sequelize = require('sequelize');
const op = Sequelize.Op;
const { QueryTypes } = require('sequelize')
const db = require('../database/connection')

const postInvoices = async (req = request, res = response) => {
    try {
        const { date, bill_number, iva, tax, dynamax, other_concepts, sub_total, total, fuels } = req.body
        const token = req.header('Authorization')
        const { id } = jwt.verify(token, process.env.SECRET_KEY)
        const user_id = id

        const buy_fuel_bill_number = await BuyFuel.findOne({
            where: {
                bill_number
            }
        })

        if (buy_fuel_bill_number) {
            return res.status(404).json({
                msg: 'Este número de factura ya se encuentra registrado'
            })
        }

        const buy_fuel = await BuyFuel.create({
            date,
            bill_number,
            iva,
            tax,
            dynamax,
            other_concepts,
            sub_total,
            total,
            user_id,
            status_id: 1
        })

        await buy_fuel.save()

        const buy_fuel_id = buy_fuel.id;

        for (const fuel of fuels) {
            const count = fuel.count
            const unit_value = fuel.unit_value
            const fuel_id = fuel.id

            const fuel_tax_history_detail = await BuyFuelDetail.create({
                buy_fuel_id,
                fuel_id,
                count,
                unit_value,
                status_id: 1
            })

            await fuel_tax_history_detail.save()

            Fuel.update(
                {
                    purchase_price: unit_value
                }, { where: { id: fuel_id } })
        }

        res.json({
            msg: `La factura se ha creado correctamente`,
            id: buy_fuel.id,
            bill_number
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: 'Error al realizar la petición'
        })
    }
}

const putInvoices = async (req = request, res = response) => {
    try {
        const { date, bill_number, iva, tax, dynamax, other_concepts, sub_total, total, observation, fuels } = req.body
        const token = req.header('Authorization')
        const { id } = jwt.verify(token, process.env.SECRET_KEY)
        const user_id = id
        const buy_fuel_id = req.params.id

        const invoice = await BuyFuel.findOne({
            where: {
                id: buy_fuel_id
            }
        })

        const last_bill = await BuyFuel.findOne({
            attributes: [
                [Sequelize.fn('max', Sequelize.col('id')), 'last_bill']
            ],
            raw: true,
        })

        if (!invoice) {
            return res.status(404).json({
                msg: 'El id de la factura no es valido'
            })
        }

        BuyFuel.update(
            {
                date,
                bill_number,
                iva,
                tax,
                dynamax,
                other_concepts,
                sub_total,
                total,
                observation,
                user_id
            }, { where: { id: buy_fuel_id } })

        await BuyFuelDetail.update(
            {
                status_id: 2,
            }, { where: { buy_fuel_id } })

        for (const fuel of fuels) {
            const count = fuel.count
            const unit_value = fuel.unit_value
            const fuel_id = fuel.id

            const fuel_tax_history_detail = await BuyFuelDetail.create({
                buy_fuel_id,
                fuel_id,
                count,
                unit_value,
                status_id: 1
            })

            await fuel_tax_history_detail.save()

            if (last_bill.last_bill == buy_fuel_id) {
                Fuel.update(
                    {
                        purchase_price: unit_value
                    }, { where: { id: fuel_id } })
            }
        }

        res.json({
            msg: `La factura se ha editado correctamente`,
            id: invoice.id,
            bill_number
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: 'Error al realizar la petición'
        })
    }
}

const getInvoices = async (req = response, res = request) => {
    try {
        const buy_fuels = await BuyFuel.findAndCountAll({})

        res.json({
            buy_fuels
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: 'Error al realizar la petición'
        })
    }
}

const getInvoicesReport1 = async (req = response, res = request) => {
    try {
        const { start, end } = req.query

        const buy_fuels = await BuyFuel.findAndCountAll({
            attributes: ['id', 'date', 'bill_number', 'iva', 'tax', 'dynamax', 'other_concepts', 'sub_total', 'total'],
            where: {
                status_id: 1,
                date: {
                    [op.between]: [new Date(start), new Date(end)]
                },
            }
        })

        const sum = await BuyFuel.findAll({
            attributes: [
                [Sequelize.fn('sum', Sequelize.col('total')), 'total'],
            ],
            where: {
                status_id: 1,
                date: {
                    [op.between]: [new Date(start), new Date(end)]
                },
            }
        });

        const total = sum[0].total;

        res.json({
            buy_fuels,
            total
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: 'Error al realizar la petición'
        })
    }
}

const getInvoicesReport2 = async (req = response, res = request) => {
    try {
        const { start, end } = req.query

        const buy_fuels_details = await BuyFuelDetail.findAll({
            include: [
                {
                    model: BuyFuel, required: true, attributes: ['date', 'bill_number'],
                    where: {
                        status_id: 1,
                        date: {
                            [op.between]: [new Date(start), new Date(end)]
                        },
                    },
                    order: [
                        ['bill_number', 'ASC'],
                        ['date', 'DESC'],
                    ],
                },
                { model: Fuel, required: true, attributes: ['name'], }
            ],
            attributes: ['count', 'unit_value'],
        })

        for (const buy_fuel_detail of buy_fuels_details) {
            buy_fuel_detail.fuel_name = buy_fuel_detail.fuel.name
            buy_fuel_detail.date_inovice = buy_fuel_detail.buy_fuel.date
            buy_fuel_detail.bill_number = buy_fuel_detail.buy_fuel.bill_number
        }

        const totals = await db.query("select  f.name as fuel_name, sum(bfd.count) as total_count, sum(bfd.unit_value) as total_value, sum(bfd.count) * sum(bfd.unit_value) as total from buy_fuel_details bfd inner join buy_fuels bf on bf.id = bfd.buy_fuel_id inner join fuels f on f.id = bfd.fuel_id where bf.status_id = 1 and bf.date BETWEEN :start and :end GROUP by bfd.fuel_id",
            {
                replacements: { start, end },
                type: QueryTypes.SELECT
            });

        BuyFuelDetail.prototype.toJSON = function () {
            const { fuel, buy_fuel, ...buy_fuels_details } = Object.assign({}, this.get());
            return buy_fuels_details;
        }

        res.json({
            buy_fuels_details,
            totals
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: 'Error al realizar la petición'
        })
    }
}

const getInvoicesById = async (req = response, res = request) => {
    try {
        const { id } = req.params

        const buy_fuels = await BuyFuel.findOne({
            where: {
                id
            }
        })

        if (!buy_fuels) {
            return res.status(404).json({
                msg: 'El id de la factura no es valido'
            })
        }

        const buy_fuels_details = await BuyFuelDetail.findAll({
            include: [
                { model: Fuel, required: true }
            ],
            where: {
                buy_fuel_id: id,
                status_id: 1
            }
        })

        buy_fuels.fuels = buy_fuels_details

        res.json({
            buy_fuels
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: 'Error al realizar la petición'
        })
    }
}

const uploadInvoices = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const folder = 'invoices'
        const invoice = await BuyFuel.findOne({
            where: {
                id,
            }
        })

        if (!invoice) {
            return res.status(404).json({
                msg: 'El id de la factura no es valido'
            })
        }

        const path_file = await uploadDocuments(req.files, ['pdf', 'png', 'jpg', 'jpeg'], folder)

        if (!invoice.attached) {
            invoice.attached = 'abc'
        }

        const uploadPath = path.join(__dirname, '../uploads/', folder, invoice.attached)

        if (fs.existsSync(uploadPath)) {
            fs.unlinkSync(uploadPath)
        }

        await BuyFuel.update(
            {
                attached: path_file,
            }, { where: { id } })

        res.json({
            msg: `Factura cargada correctamente`,
            path_file
        })

    } catch (msg) {
        console.error(msg)
        res.status(500).json({
            msg
        })
    }
}

const getUploadInvoices = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const folder = 'invoices'
        const invoice = await BuyFuel.findOne({
            where: {
                attached: id,
            }
        })

        if (!invoice) {
            return res.status(404).json({
                msg: 'El id del documento no es valido'
            })
        }

        if (!invoice.attached) {
            return res.status(404).json({
                msg: 'Está factura no tiene adjunto'
            })
        }

        const uploadPath = path.join(__dirname, '../uploads/', folder, invoice.attached)

        if (fs.existsSync(uploadPath)) {
            return res.sendFile(uploadPath)
        }
    } catch (msg) {
        console.error(msg)
        res.status(500).json({
            msg
        })
    }
}

module.exports = {
    postInvoices,
    putInvoices,
    getInvoices,
    getInvoicesReport1,
    getInvoicesReport2,
    getInvoicesById,
    uploadInvoices,
    getUploadInvoices
}