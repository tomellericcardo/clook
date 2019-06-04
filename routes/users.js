// Required modules
const express = require('express');

// Local modules
const userController = require('../controllers/users');


// Create and setup router
const router = express.Router();

// Routes
router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);


// Export module
module.exports = router;
