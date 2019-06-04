const clookModel = require('../models/clooks');


module.exports = {

    create: function(req, res, next) {
        clookModel.create({
            author: req.body.userId,
            title: req.body.title,
            duration: req.body.duration
        }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({
                    status: "success",
                    message: "Clook added successfully!!!",
                    data: null
                });
        });
    }

};
