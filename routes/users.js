const { Router } = require('express')
const { getUsers, postUsers, putUsers, loginUser, logoutUser, patchUsers, getRoles, getTypeDocument } = require('../controllers/users')
const { check, query } = require('express-validator')
const { ValidatorFiels, validatorJWT } = require('../middlewares')
const { validatedRole, validatedTypeDocument, validatedDocument, validatedId } = require('../helpers/db-validators')

const router = Router()

router.get('/', [
    validatorJWT,
    query("limit", "El valor de 'limit' debe ser numérico").isNumeric().optional(),
    query("offset", "El valor de 'offset' debe ser numérico").isNumeric().optional(),
    ValidatorFiels,
], getUsers)

router.post('/', [
    validatorJWT,
    check('document', 'El documento no es valido').isNumeric().isLength({ max: 10 }),
    check('document').custom(validatedDocument),
    check('type_document_id').custom(validatedTypeDocument),
    check('name', 'El nombre no es valido').not().isEmpty(),
    check('last_name', 'El apellido no es valido').not().isEmpty(),
    check('email', 'El email no es valido').isEmail(),
    check('cellphone', 'El celular no es valido').not().isEmpty().isNumeric().isLength({ min: 10, max: 10 }),
    check('password', 'La contraseña no es valido, debe ser mayor a 8 caracteres').not().isEmpty().isLength({ min: 8 }),
    check('role_id').custom(validatedRole),
    ValidatorFiels
], postUsers)

router.put('/:id', [
    validatorJWT,
    check('id', 'El id no es valido').isNumeric().isLength({ min: 1 }),
    check('id').custom(validatedId),
    check('type_document_id').custom(validatedTypeDocument),
    check('name', 'El nombre no es valido').not().isEmpty(),
    check('last_name', 'El apellido no es valido').not().isEmpty(),
    check('email', 'El email no es valido').isEmail(),
    check('cellphone', 'El celular no es valido').not().isEmpty().isNumeric().isLength({ min: 10, max: 10 }),
    check('password', 'La contraseña no es valido, debe ser mayor a 8 caracteres').not().isEmpty().isLength({ min: 8 }),
    check('role_id').custom(validatedRole),
    ValidatorFiels
], putUsers)

router.post('/login', [
    check('document', 'El documento no es valido').isNumeric().isLength({ min: 3, max: 10 }),
    check('password', 'La contraseña no es valida').not().isEmpty(),
    ValidatorFiels
], loginUser)

router.post('/logout/:id', [
    validatorJWT,
    check('id', 'El id no es valido').isNumeric().isLength({ min: 1 }),
    check('id').custom(validatedId),
    ValidatorFiels
], logoutUser)


router.patch('/:id', [
    validatorJWT,
    check('id', 'El id no es valido').isNumeric().isLength({ min: 1 }),
    check('id').custom(validatedId),
    check('status_id', 'El estado no es valido').isNumeric().isLength({ min: 1, max: 1 }),
    ValidatorFiels
], patchUsers)

router.get('/roles/', [
    validatorJWT,
], getRoles)

router.get('/type-document/', [
    validatorJWT,
], getTypeDocument)

module.exports = router