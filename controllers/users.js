// Required modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user_model = require('../models/users');


// Controller module
var user_controller = {

    // New user creation
    create_user: function(req, res, next) {
        user_model.init().then(function() {
            user_model.create({
                username: req.body.username,
                password: req.body.password
            }, function(err, user_document) {
                if (err) {
                    res.send({
                        status: 'error',
                        message: 'Username already in use',
                        data: null
                    });
                } else {
                    user_controller.create_callback(req, res, user_document);
                }
            });
        });
    },

    // New user callback
    create_callback: function(req, res, user_document) {
        let token = jwt.sign(
            {id: user_document._id},
            req.app.get('secret'),
            {expiresIn: 86400}
        );
        res.cookie('token', token, {
            maxAge: 86400,
            httpOnly: true
        }).send({
            status: 'success',
            message: 'New user created successfully',
            data: null
        });
    },

    // User authentication
    authenticate_user: function(req, res, next) {
        user_model.findOne({
            username: req.body.username
        }, function(err, user_document) {
            if (err) next(err);
            else if (!user_document) {
                res.send({
                    status: 'error',
                    message: 'Invalid username/password',
                    data: null
                });
            } else {
                user_controller.authenticate_callback(req, res, user_document);
            }
        });
    },

    // User authentication callback
    authenticate_callback: function(req, res, user_document) {
        if (bcrypt.compareSync(
            req.body.password,
            user_document.password
        )) {
            let token = jwt.sign(
                {id: user_document._id},
                req.app.get('secret'),
                {expiresIn: 86400}
            );
            res.cookie('token', token, {
                maxAge: 86400000,
                httpOnly: true}
            ).send({
                status: 'success',
                message: 'User authenticated successfully',
                data: null
            });
        } else {
            res.send({
                status: 'error',
                message: 'Invalid username/password',
                data: null
            });
        }
    },

    // Update user
    update_user: function(req, res, next) {
        user_model.findById(req.body.user_id, function(err, user_document) {
            if (err) next(err);
            else if (bcrypt.compareSync(
                req.body.password,
                user_document.password
            )) {
                user_document.password = req.body.new_password;
                user_document.save();
                res.send({
                    status: 'success',
                    message: 'User updated successfully',
                    data: null
                });
            } else {
                res.send({
                    status: 'error',
                    message: 'Invalid password',
                    data: null
                });
            }
        });
    },

    // Delete user
    delete_user: function(req, res, next) {
        user_model.findByIdAndRemove(req.body.user_id, function(err, user_document) {
            if (err) next(err);
            else {
                res.cookie('token', {maxAge: Date.now()});
                next();
            }
        });
    }

};


// Export module
module.exports = user_controller;
