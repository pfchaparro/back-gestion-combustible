const dbValidators = require('./db-validators')
const generatedJWT = require('./generated-jwt')
const uploadDocuments = require('./upload-document')

module.exports = {
    ...dbValidators,
    ...generatedJWT,
    ...uploadDocuments
}