const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const { FuelPriceHistory, Fuel } = require('../models')

const postFuelPrices = async (req = request, res = response) => {
    try {
        const { sale_price, observation } = req.body
        const { id } = req.params

        const fuel = await Fuel.findOne({
            where: {
                id
            }
        })

        if (!fuel) {
            return res.status(404).json({
                msg: 'El id del combustible no es valido'
            })
        }

        await Fuel.update({
            sale_price
        }, {
            where: {
                id
            }
        });

        await FuelPriceHistory.update({
            status_id: 2
        }, {
            where: {
                fuel_id: id
            }
        });

        await FuelPriceHistory.update({
            status_id: 2
        }, {
            where: {
                fuel_id: id
            }
        });

        const token = req.header('Authorization')
        const user_id = jwt.verify(token, process.env.SECRET_KEY).id

        const new_fuel_price_history = await FuelPriceHistory.create({
            sale_price,
            fuel_id: id,
            observation,
            status_id: 1,
            user_id,
            purchase_price: 0
        })

        await new_fuel_price_history.save()

        res.json({
            msg: `Los precios del combustible se han actualizado correctamente`
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: 'Error al realizar la petición'
        })
    }
}

const getFuelPrices = async (req = response, res = request) => {
    try {
        const fuel_price_history = await Fuel.findAndCountAll()

        res.json({
            fuel_price_history
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: 'Error al realizar la petición'
        })
    }
}

module.exports = {
    getFuelPrices,
    postFuelPrices
}