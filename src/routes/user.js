// ************ Require's ************
const express = require('express');
const router = express.Router();
const {
    profile,
    purchases,
    login,
    register,
    loginProcess,
    registerProcess
} = require('../controllers/userController');
const loginValidator = require('../validations/loginValidator')
const registerValidator = require('../validations/registerValidator')
const uploadUserAvatar = require('../middlewares/uploadUserAvatar')
const userLog = require('../middlewares/userLog')
const userSessionCheck = require('../middlewares/userSessionCheck')


// ************ Controller Require ************

router.get('/profile',userSessionCheck, profile);

router.get('/profile/purchases',userSessionCheck, purchases);

router.get('/login', userLog, login);
router.post('/login', loginValidator, loginProcess)

router.get('/register', userLog, register); 
router.post('/register', uploadUserAvatar.single('avatar'), registerValidator, registerProcess)

module.exports = router;
