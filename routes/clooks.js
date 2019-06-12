// Required modules
const express = require('express');
const auth = require('../middlewares/auth');
const clook_controller = require('../controllers/clooks');

// Express router
const router = express.Router()


// New clook page
router.get('/new', auth.validate_user, function(req, res) {
    res.render('new', {
        back: true,
        title: 'New clook',
        scripts: ['ajax', 'new']
    });
});

// Other routes
router.get('/', auth.validate_user, clook_controller.get_clooks);
router.get('/:clook_id', auth.validate_user, clook_controller.get_clook);
router.post('/', auth.validate_user, clook_controller.create_clook);
router.put('/', auth.validate_user, clook_controller.update_clook);
router.delete('/', auth.validate_user, clook_controller.delete_clook);


// Export module
module.exports = router;
