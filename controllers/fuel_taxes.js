const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const { FuelTaxHistory, FuelTaxHistoryDetail, Fuel, Tax, Status, TaxInvoice } = require('../models')
const { QueryTypes } = require('sequelize')
const db = require('../database/connection')

const postFuelTaxes = async (req = request, res = response) => {
    try {
        const { date, fuels_taxes } = req.body
        const token = req.header('Authorization')
        const { id } = jwt.verify(token, process.env.SECRET_KEY)
        const user_id = id

        const date_fuel_tax_history = await FuelTaxHistory.findOne({
            where: {
                date: new Date(date)
            }
        })

        if (date_fuel_tax_history) {
            return res.status(404).json({
                msg: 'Los impuestos para está fecha ya se encuentran registrados'
            })
        }

        FuelTaxHistory.update({ status_id: 2 }, { where: { status_id: 1 } })

        const fuel_tax_history = await FuelTaxHistory.create({
            date,
            user_id,
            status_id: 1
        })

        await fuel_tax_history.save()

        const fuel_tax_histories_id = fuel_tax_history.id

        TaxInvoice.update({
            fuel_tax_histories_id
        }, {
            where: {
            }
        })

        for (const taxes of fuels_taxes) {
            const tax_id = taxes.id

            for (const fuel_taxes of taxes.fuels) {
                const fuel_id = fuel_taxes.id
                const value = fuel_taxes.value

                const fuel_tax_history_detail = await FuelTaxHistoryDetail.create({
                    fuel_tax_histories_id,
                    fuel_id,
                    tax_id,
                    value
                })

                TaxInvoice.update({
                    value
                }, {
                    where: {
                        fuel_id,
                        tax_id
                    }
                })

                await fuel_tax_history_detail.save()
            }
        }

        res.json({
            msg: `Los impuestos del combustible se han creado correctamente`,
            date,
            fuels_taxes
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: 'Error al realizar la petición'
        })
    }
}

const putFuelTaxes = async (req = request, res = response) => {
    try {
        const { date, fuels_taxes, observation } = req.body
        const token = req.header('Authorization')
        const { id } = jwt.verify(token, process.env.SECRET_KEY)
        const user_id = id

        const history = await FuelTaxHistory.findOne({
            where: {
                id: req.params.id
            }
        })

        if (!history) {
            return res.status(404).json({
                msg: 'El id del historico no es valido'
            })
        }

        if (history.status_id == 2) {
            return res.status(404).json({
                msg: 'No se puede actualizar un historico INACTIVO'
            })
        }

        const fuel_tax_histories_id = history.id

        FuelTaxHistory.update({ date, observation }, { where: { id: fuel_tax_histories_id } })

        for (const taxes of fuels_taxes) {
            const tax_id = taxes.id

            for (const fuel_taxes of taxes.fuels) {
                const fuel_id = fuel_taxes.id
                const value = fuel_taxes.value

                await FuelTaxHistoryDetail.update({
                    value
                }, {
                    where: {
                        fuel_tax_histories_id,
                        fuel_id,
                        tax_id,
                    }
                })

                TaxInvoice.update({
                    value
                }, {
                    where: {
                        fuel_id,
                        tax_id
                    }
                })
            }
        }

        res.json({
            msg: `Los impuestos del combustible se han actualizado correctamente`,
            date,
            fuels_taxes
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: 'Error al realizar la petición'
        })
    }
}

const getFuelTaxesAll = async (req = response, res = request) => {
    try {
        const taxes = await Tax.findAndCountAll({
            order: [
                ['order', 'ASC']
            ],
        })

        const fuels = await Fuel.findAll({
            order: [
                ['order', 'ASC']
            ]
        })

        taxes.rows.forEach(element => {
            element.fuels = fuels
        });

        res.json({
            taxes
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: 'Error al realizar la petición'
        })
    }
}

const getFuelTaxes = async (req = response, res = request) => {
    try {
        const fuel_tax_histories = await FuelTaxHistory.findAndCountAll({
            include: [
                { model: Status, required: true }
            ],
            order: [
                ['id', 'DESC']
            ],
        })

        res.json({
            fuel_tax_histories
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: 'Error al realizar la petición'
        })
    }
}


const getFuelTaxesById = async (req = response, res = request) => {
    try {
        const { id } = req.params

        const fuel_tax_history = await FuelTaxHistory.findOne({
            where: {
                id
            }
        })

        const fuel_tax_histories_details = await FuelTaxHistoryDetail.findAll({
            include: [
                { model: Fuel, required: true },
                { model: Tax, required: true }
            ],
            where: {
                fuel_tax_histories_id: id
            }
        })

        if (!fuel_tax_histories_details) {
            return res.status(404).json({
                msg: 'El id del historico no es valido'
            })
        }

        res.json({
            fuel_tax_history,
            fuel_tax_histories_details
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: 'Error al realizar la petición'
        })
    }
}

const getReport4 = async (req = response, res = request) => {
    try {

        /*
        select fthd.tax_id, t.name as name_tax, AVG(fthd.value) as value from fuel_tax_histories fth
       INNER JOIN fuel_tax_history_details fthd ON fthd.fuel_tax_histories_id = fth.id
       INNER JOIN fuels f on f.id = fthd.fuel_id
       inner join taxes t on t.id  = fthd.tax_id
       where `date` BETWEEN '2023-01-01 00:00:00' and '2023-01-31 00:00:00' and f.name = 'CORRIENTE'
       and t.name IN ('INGRESO AL PRODUCTOR', 'IMPUESTO NACIONAL', 'MARGEN MAYORISTA')
       GROUP by fthd.tax_id
        */

        const { start, end } = req.query

        const taxes = [
            'SOBRETASA GASOLINA - DIESEL',
            'IMPUESTO NACIONAL',
            'IMPUESTO CARBONO',
            'IVA INGRESO PRODUCTOR (IVA 5% POR CADA GALON)',
            'SOLDICOM $COP',
            'MARGEN MAYORISTA'
        ];

        const fuel_cost = await db.query("select f.id, f.name, f.sale_price, f.purchase_price from fuels f order by `order` ASC",
            {
                replacements: { start, end },
                type: QueryTypes.SELECT
            });

        for (const fuel of fuel_cost) {
            fuel_id = fuel.id
            fuel.tax = await db.query("select fthd.tax_id, t.name as name_tax, AVG(fthd.value) as value from fuel_tax_histories fth INNER JOIN fuel_tax_history_details fthd ON fthd.fuel_tax_histories_id = fth.id INNER JOIN fuels f on f.id = fthd.fuel_id inner join taxes t on t.id  = fthd.tax_id where fth.date BETWEEN :start and :end and f.id = :fuel_id and t.name IN (:taxes) GROUP by fthd.tax_id",
                {
                    replacements: { start, end, fuel_id, taxes },
                    type: QueryTypes.SELECT
                });

            /*
            select AVG(bfd.unit_value) as combustible
            from buy_fuel_details bfd
            join buy_fuels d on d.id = bfd.buy_fuel_id
            where d.date BETWEEN '2023-01-01 00:00:00' and '2023-01-31 00:00:00'
            and bfd.fuel_id = '1'
            GROUP by bfd.fuel_id
            */
            fuel.history_price = await db.query("select AVG(bfd.unit_value) as combustible from buy_fuel_details bfd join buy_fuels d on d.id = bfd.buy_fuel_id where d.date BETWEEN :start and :end and bfd.fuel_id = :fuel_id GROUP by bfd.fuel_id",
                {
                    replacements: { start, end, fuel_id },
                    type: QueryTypes.SELECT
                });

            for (const tax of fuel.tax) {
                if (tax.name_tax == taxes['0']) {
                    fuel.sobretasa = parseFloat(tax.value)
                }

                if (tax.name_tax == taxes['1']) {
                    fuel.impuesto_nacional = parseFloat(tax.value)
                }

                if (tax.name_tax == taxes['2']) {
                    fuel.impuesto_carbono = parseFloat(tax.value)
                }

                if (tax.name_tax == taxes['3']) {
                    fuel.iva = parseFloat(tax.value)
                }

                if (tax.name_tax == taxes['4']) {
                    fuel.soldicom = parseFloat(tax.value)
                }

                if (tax.name_tax == taxes['5']) {
                    fuel.margen_mayorista = parseFloat(tax.value)
                }
            }

            /*
             select AVG(bfd.unit_value) as combustible_1 from buy_fuel_details bfd
                    join buy_fuels d on d.id = bfd.buy_fuel_id
            where d.date BETWEEN '2023-01-01 00:00:00' and '2023-01-31 00:00:00'
            and bfd.fuel_id = '1'
            GROUP by bfd.fuel_id
            */
            fuel.buy_fuel_details = await db.query("select AVG(bfd.unit_value) as combustible_1 from buy_fuel_details bfd join buy_fuels d on d.id = bfd.buy_fuel_id where d.date BETWEEN :start and :end and bfd.fuel_id = :fuel_id GROUP by bfd.fuel_id",
                {
                    replacements: { start, end, fuel_id },
                    type: QueryTypes.SELECT
                });

            // COMBUSTIBLE
            fuel.combustible_1 = fuel.buy_fuel_details[0] ? parseFloat(fuel.buy_fuel_details[0].combustible_1) : 0
            delete fuel.history_price
            delete fuel.buy_fuel_details

            // COSTO GALON
            fuel.costo_galon = fuel.combustible_1 + fuel.sobretasa + fuel.impuesto_nacional + fuel.impuesto_carbono + fuel.iva + fuel.soldicom

            // PRECIO COMPRA
            delete fuel.purchase_price

            // PRECIO VENTA
            fuel.precio_venta = parseFloat(fuel.sale_price)
            delete fuel.sale_price

            // UTILIDAD BRUTA
            fuel.utilidad_bruta = +fuel.precio_venta - fuel.costo_galon

            // UTILIDAD
            fuel.utilidad = fuel.utilidad_bruta + fuel.margen_mayorista

            // PORCENTAJE
            let porcentaje = (fuel.precio_venta / fuel.utilidad) / 100

            fuel.porcentaje = Number(porcentaje.toFixed(2))

            delete fuel.tax
        }

        return res.json({
            fuel_cost
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: 'Error al realizar la petición'
        })
    }
}

module.exports = {
    postFuelTaxes,
    putFuelTaxes,
    getFuelTaxes,
    getFuelTaxesAll,
    getFuelTaxesById,
    getReport4
}