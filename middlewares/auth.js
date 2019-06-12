// Required modules
const jwt = require('jsonwebtoken');


// Export module
module.exports = {

    // Check if user is logged
    check_user: function(req, res, next) {
        jwt.verify(
            req.cookies['token'],
            req.app.get('secret'),
            function(err, decoded) {
                if (err) next();
                else res.redirect('/clooks');
            }
        );
    },

    // Check if user is authenticated
    validate_user: function(req, res, next) {
        jwt.verify(
            req.cookies['token'],
            req.app.get('secret'),
            function(err, decoded) {
                if (err) res.redirect('/users/login');
                else {
                    req.body.user_id = decoded.id;
                    next();
                }
            }
        );
    }

};
