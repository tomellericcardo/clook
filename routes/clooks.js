// Required modules
const express = require('express');

// Local modules
const clookController = require('../controllers/clooks');


// Create and setup router
const router = express.Router();

// Routes
router.post('/', clookController.create);


// Export module
module.exports = router;
