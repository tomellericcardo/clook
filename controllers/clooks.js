// Required modules
const clookModel = require('../models/clooks');


// Export module
module.exports = {

    // Get all user's clooks
    getClooks: function(req, res, next) {
        let clooksList = [];
        clookModel.find({
            author: req.body.userId
        }, function(err, clooks) {
            if (err) next(err);
            else {
                for (let clook of clooks)
                    clooksList.push({
                        id: clook._id,
                        title: clook.title,
                        duration: clook.duration,
                        color: clook.color,
                        started: clook.started
                    });
                res.render('clooks', {
                    title: 'Clooks',
                    sidebar: true,
                    clooksList: clooksList,
                    scripts: ['clooks']
                });
            }
        });
    },

    // New clook creation
    createClook: function(req, res, next) {
        clookModel.create({
            author: req.body.userId,
            title: req.body.title,
            duration: req.body.duration,
            color: req.body.color,
            started: req.body.started
        }, function (err, clookInfo) {
            if (err) next(err);
            else res.send({
                status: 'success',
                message: 'New clook created successfully',
                data: {id: clookInfo._id}
            });
        });
    },

    // Get clook by id
    getClook: function(req, res, next) {
        clookModel.findOne({
            _id: req.params.clookId,
            author: req.body.userId
        }, function(err, clookInfo) {
            if (err) next(err);
            else
                res.render('clook', {
                    title: clookInfo.title,
                    sidebar: true,
                    styles: ['clook'],
                    clook: clookInfo,
                    scripts: ['ajax', 'message', 'clook']
                });
        });
    },

    // Update clook by id
    updateClook: function(req, res, next) {
        console.log(req.body.started);
        clookModel.findOneAndUpdate({
            _id: req.body.clookId,
            author: req.body.userId
        }, {
            started: req.body.started
        }, function(err, clookInfo) {
            if (err) next(err);
            else res.send({
                status: 'success',
                message: 'Clook updated successfully',
                data: null
            });
        });
    },

    // Delete clook by id
    deleteClook: function(req, res, next) {
        clookModel.findOneAndRemove({
            _id: req.body.clookId,
            author: req.body.userId
        }, function(err, clookInfo) {
            if (err) next(err);
            else res.send({
                status: 'success',
                message: 'Clook deleted successfully',
                data: null
            });
        });
    }

};
