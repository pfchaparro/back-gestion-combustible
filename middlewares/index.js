const ValidatorFiels = require('./validator-fiels')
const validatorJWT = require('./validator-jwt')
const ValidatorFile = require('./validator-file')

module.exports = {
    ...ValidatorFiels,
    ...validatorJWT,
    ...ValidatorFile
}