// Local modules
const clookModel = require('../models/clooks');


// Export module
module.exports = {

    // New clook creation
    create: function(req, res, next) {
        clookModel.create({
            author: req.body.userId,
            title: req.body.title,
            duration: req.body.duration,
            started: req.body.started
        }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({
                    status: 'success',
                    message: 'New clook created successfully',
                    data: null
                });
        });
    }

};
