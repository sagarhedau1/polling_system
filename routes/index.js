// Import express module
const express = require('express');
// Creat router object
const router = express.Router();
// Import mongoose module
const mongoose = require('mongoose')
// Import Option model
const Option = require('../models/option')
// Import homeController
const homeController = require('../controller/home_controller')
// Import optionController
const optionController = require('../controller/option_controller')

// Sett up route 
router.get('/', homeController.home);

// Set up route for question and option 
router.use('/questions', require('./question'))
router.use('/options', require('./option'))

// Exporting router
module.exports = router;