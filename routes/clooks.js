// Required modules
const express = require('express');
const clookController = require('../controllers/clooks');


// Create and setup router
const router = express.Router();
router.get('/', clookController.getClooks);
router.post('/', clookController.createClook);
router.get('/:clookId', clookController.getClook);
router.put('/:clookId', clookController.updateClook);
router.delete('/:clookId', clookController.deleteClook);


// Export module
module.exports = router;
