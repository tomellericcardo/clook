// Required modules
const express = require('express');
const auth = require('../middlewares/auth');
const user_controller = require('../controllers/users');
const clook_controller = require('../controllers/clooks');

// Express router
const router = express.Router()


// Registration page
router.get('/registration', auth.check_user, function(req, res) {
    res.render('registration', {
        title: 'Registration',
        scripts: ['ajax', 'registration']
    });
});

// Login page
router.get('/login', auth.check_user, function(req, res) {
    res.render('login', {
        title: 'Login',
        scripts: ['ajax', 'login']
    });
});

// Logout page
router.get('/logout', function(req, res) {
    res.cookie('token', {maxAge: Date.now()}).redirect('/users/login');
});

// Settings page
router.get('/settings', auth.validate_user, function(req, res) {
    res.render('settings', {
        back: true,
        title: 'Settings',
        scripts: ['ajax', 'settings']
    });
});

// Other routes
router.post('/register', user_controller.create_user);
router.post('/authenticate', user_controller.authenticate_user);
router.put('/', auth.validate_user, user_controller.update_user);
router.delete('/', auth.validate_user, user_controller.delete_user, clook_controller.delete_clooks);


// Export module
module.exports = router;
