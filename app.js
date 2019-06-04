const express = require('express');
const logger = require('morgan');
const users = require('./routes/users');
const clooks = require('./routes/clooks');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('./config/database');
const jwt = require('jsonwebtoken');


const app = express();
app.set('secretKey', 'nodeRestApi');

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


app.get('/', function(req, res) {
    res.json({"tutorial" : "Build REST API with node.js"});
});

app.use('/users', users);
app.use('/clooks', validateUser, clooks);
app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});


function validateUser(req, res, next) {
    jwt.verify(req.cookies['token'], req.app.get('secretKey'), function(err, decoded) {
        if (err)
            res.json({status: "error", message: err.message, data: null});
        else {
            req.body.userId = decoded.id;
            next();
        }
    });
}


app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    console.log(err);
    if(err.status === 404)
        res.status(404).json({message: "Not found"});
    else
        res.status(500).json({message: "Something went wrong"});
});


var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Node server listening on port ' + port);
});
