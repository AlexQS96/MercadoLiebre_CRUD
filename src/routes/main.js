// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

router.get('/', mainController.index); 
router.get('/search', mainController.search); 
router.get('/stores', mainController.stores);
router.get('/help', mainController.help); 

module.exports = router;
