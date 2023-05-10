const Role = require('./role')
const TypeDocument = require('./type_document')
const Status = require('./status')
const RoleModule = require('./role_module')
const Module = require('./module')
const User = require('./user')

const FuelTaxHistory = require('./fuel_tax_history')
const FuelTaxHistoryDetail = require('./fuel_tax_history_detail')
const Fuel = require('./fuel')
const Tax = require('./tax')
const FuelPriceHistory = require('./fuel_price_history')

const TaxInvoice = require('./tax_invoice')
const BuyFuel = require('./buy_fuel')
const BuyFuelDetail = require('./buy_fuel_detail')

const SaleFuel = require('./sale_fuel')
const SaleFuelDetail = require('./sale_fuel_detail')

module.exports = {
    Role,
    TypeDocument,
    Status,
    RoleModule,
    Module,
    User,
    FuelTaxHistory,
    FuelTaxHistoryDetail,
    Fuel,
    Tax,
    FuelPriceHistory,
    TaxInvoice,
    BuyFuel,
    BuyFuelDetail,
    SaleFuel,
    SaleFuelDetail
}