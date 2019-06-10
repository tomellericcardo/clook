// Required modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/users');


// Export module
module.exports = {

    // New user creation
    create: function(req, res, next) {
        userModel.init().then(function() {
            userModel.create({
                username: req.body.username,
                password: req.body.password
            }, function (err, userInfo) {
                if (err)
                    res.send({
                        status: 'error',
                        message: 'Username already in use',
                        data: null
                    });
                else {
                    let token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), {expiresIn: 86400});
                    res.cookie('token', token, {maxAge: 86400, httpOnly: true}).send({
                        status: 'success',
                        message: 'New user created successfully',
                        data: null
                    });
                }
            });
        });
    },

    // User authentication
    authenticate: function(req, res, next) {
        userModel.findOne({
            username: req.body.username
        }, function(err, userInfo) {
            if (err) next(err);
            else if (userInfo) {
                if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                    let token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), {expiresIn: 86400});
                    res.cookie('token', token, {maxAge: 86400000, httpOnly: true}).send({
                        status: 'success',
                        message: 'User authenticated successfully',
                        data: null
                    });
                } else
                    res.send({
                        status: 'error',
                        message: 'Invalid username/password',
                        data: null
                    });
            } else
                res.send({
                    status: 'error',
                    message: 'Invalid username/password',
                    data: null
                });
        });
    },

    updateUser: function(req, res, next) {
        userModel.findById(req.body.userId, function(err, userInfo) {
            if (err) next(err);
            else if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                userInfo.password = req.body.new_password;
                userInfo.save();
                res.send({
                    status: 'success',
                    message: 'User updated successfully',
                    data: null
                });
            } else
                res.send({
                    status: 'error',
                    message: 'Invalid password',
                    data: null
                });
        });
    },

    deleteUser: function(req, res, next) {
        userModel.findByIdAndRemove(req.body.userId, function(err, userInfo) {
            if (err) next(err);
            else next();
        });
    }

};
