const clookModel = require('../models/clooks');


module.exports = {

    create: function(req, res, next) {
        clookModel.create({name: req.body.name, released_on: req.body.released_on}, function (err, result) {
            if (err)
                next(err);
            else
                res.json({status: "success", message: "Clook added successfully!!!", data: null});
        });
    }

};
