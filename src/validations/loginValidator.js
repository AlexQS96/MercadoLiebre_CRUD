const { check, body } = require('express-validator')
const { users } = require('../data/dataBase')
let bcrypt = require('bcryptjs')

module.exports = [
    check('username')
    .notEmpty()
    .withMessage('Debes ingresar un usuario'),

    body('username')
    .custom(value => {
        let user = users.find(user => user.username === value)

        if(user !== undefined){
            return true
        }else{
            return false
        }
    })
    .withMessage("Usuario no registrado"),

    check('pass')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña'),

    body('pass')
    .custom((value, {req}) => {
        let user = users.find(user => user.username === req.body.username)
        return bcrypt.compareSync(value, user.pass)
    })
    .withMessage('Contraseña inválida')
]