const { check, body } = require('express-validator')
const { users } = require('../data/dataBase')

module.exports = [
    check('name')
    .notEmpty()
    .withMessage('Debes escribir un nombre'),

    check('username')
    .notEmpty()
    .withMessage('Debes escribir un usuario'),

    check('email')
    .notEmpty()
    .withMessage('Debes escribir un email').bail()
    .isEmail()
    .withMessage('Debes escribir un email válido'),

    body('email')
    .custom(value => {
        let user = users.find(user => user.email === value)

        if(user === undefined){
            return true
        }else{
            return false
        }
    })
    .withMessage("Email ya registrado"),

    check('birthday')
    .notEmpty()
    .withMessage('Debes escoger una fecha'),

    check('address')
    .notEmpty()
    .withMessage('Debes escribir un domicilio'),

    check('pass')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña')
    .isLength({
        min: 6
    })
    .withMessage('La contraseña debe tener como mínimo 6 caracteres'),

    body('passCheck')
    .custom((value, {req}) => value !== req.body.pass ? false : true)
    .withMessage('Las contraseñas no coinciden'),
]