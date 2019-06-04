// Required modules
const express = require('express');
const userController = require('../controllers/users');


// Create and setup router
const router = express.Router();
router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);

router.get('/registration', function(req, res) {
    res.render('registration');
});

router.get('/login', function(req, res) {
    res.render('login');
});



// Export module
module.exports = router;
