// Required modules
const clook_model = require('../models/clooks');


// Controller module
var clook_controller = {

    // Get all user's clooks
    get_clooks: function(req, res, next) {
        clook_model.find({
            author: req.body.user_id
        }, function(err, clook_documents) {
            if (err) next(err);
            else {
                res.render('home', {
                    sidebar: true,
                    title: 'Clooks',
                    styles: ['clook'],
                    clooks: clook_documents,
                    scripts: ['home']
                });
            }
        });
    },

    // New clook creation
    create_clook: function(req, res, next) {
        clook_model.create({
            author: req.body.user_id,
            title: req.body.title,
            duration: req.body.duration,
            color: req.body.color,
            started: req.body.started
        }, function (err, clook_document) {
            if (err) next(err);
            else {
                res.send({
                    status: 'success',
                    message: 'New clook created successfully',
                    data: {id: clook_document._id}
                });
            }
        });
    },

    // Get clook by id
    get_clook: function(req, res, next) {
        clook_model.findOne({
            _id: req.params.clook_id,
            author: req.body.user_id
        }, function(err, clook_document) {
            if (err) next(err);
            else {
                res.render('clook', {
                    back: true,
                    title: clook_document.title,
                    styles: ['clook'],
                    clook: clook_document,
                    scripts: ['ajax', 'clook']
                });
            }
        });
    },

    // Update clook by id
    update_clook: function(req, res, next) {
        clook_model.findOneAndUpdate({
            _id: req.body.clook_id,
            author: req.body.user_id
        }, {
            started: req.body.started
        }, function(err, clook_document) {
            if (err) next(err);
            else {
                res.send({
                    status: 'success',
                    message: 'Clook updated successfully',
                    data: null
                });
            }
        });
    },

    // Delete clook by id
    delete_clook: function(req, res, next) {
        clook_model.findOneAndRemove({
            _id: req.body.clook_id,
            author: req.body.user_id
        }, function(err, clook_document) {
            if (err) next(err);
            else {
                res.send({
                    status: 'success',
                    message: 'Clook deleted successfully',
                    data: null
                });
            }
        });
    },

    // Delete clooks by author
    delete_clooks: function(req, res, next) {
        clook_model.deleteMany({
            author: req.body.user_id
        }, function(err, clook_document) {
            if (err) next(err);
            else {
                res.send({
                    status: 'success',
                    message: 'Clook deleted successfully',
                    data: null
                });
            }
        });
    }

};


// Export module
module.exports = clook_controller;
