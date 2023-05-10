const express = require('express')
const cors = require('cors')
const db = require('../database/connection')
const fileUpload = require('express-fileupload')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT || 3000
        this.basePath = process.env.BASE_PATH

        this.paths = {
            users: `${this.basePath}users`,
            fuel_taxes: `${this.basePath}fuel_taxes`,
            fuel_prices: `${this.basePath}fuel_prices`,
            tax_invoices: `${this.basePath}tax_invoices`,
            invoices: `${this.basePath}invoices`,
            sale_fuels: `${this.basePath}sale_fuels`,
        }

        // connection database
        this.dbConnection()

        // Middlewares
        this.middlewares()
        // Routes
        this.routes()
    }

    async dbConnection() {
        try {
            await db.authenticate()
            console.log('DB connection established')
        } catch (error) {
            throw new Error(error)
        }

    }

    middlewares() {

        // Cors
        this.app.use(cors())

        // BodyParser
        this.app.use(express.json())

        // Public directory
        this.app.use(express.static('public'))

        // Fileupload
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.users, require('../routes/users'))
        this.app.use(this.paths.fuel_taxes, require('../routes/fuel_taxes'))
        this.app.use(this.paths.fuel_prices, require('../routes/fuel_prices'))
        this.app.use(this.paths.tax_invoices, require('../routes/tax_invoices'))
        this.app.use(this.paths.invoices, require('../routes/invoices')),
        this.app.use(this.paths.sale_fuels, require('../routes/sale_fuels'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Listening on port ' + this.port);
        })
    }
}

module.exports = Server