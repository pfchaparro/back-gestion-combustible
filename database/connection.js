const { Sequelize } = require('sequelize')

const db = new Sequelize(process.env.DATABASE || "fuel_management", process.env.USERNAME || "root", process.env.PASSWORD || "password", {
    host: process.env.HOST || "localhost",
    dialect: 'mysql'
})

module.exports = db