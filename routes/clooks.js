const express = require('express');
const router = express.Router();
const clookController = require('../controllers/clooks');

router.post('/', movieController.create);


module.exports = router;
