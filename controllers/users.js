// Required modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/users');


// Export module
module.exports = {

    // New user creation
    create: function(req, res, next) {
        userModel.create({
            username: req.body.username,
            password: req.body.password
        }, function (err, result) {
            if (err)
                next(err);
            else
                res.redirect('/login');
        });
    },

    // User authentication
    authenticate: function(req, res, next) {
        userModel.findOne({
            username: req.body.username
        }, function(err, userInfo) {
            if (err)
                next(err);
            else {
                if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                    let token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), {expiresIn: 86400});
                    res.cookie('token', token, {maxAge: 86400, httpOnly: true}).redirect('/clooks');
                } else
                    res.json({
                        status: 'error',
                        message: 'Invalid username/password',
                        data: null
                    });
            }
        });
    },

};
