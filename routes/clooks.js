const express = require('express');
const router = express.Router();
const clookController = require('../controllers/clooks');

router.post('/', clookController.create);


module.exports = router;
