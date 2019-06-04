// Required modules
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const jwt = require('jsonwebtoken');
const mongoose = require('./config/database');
const users = require('./routes/users');
const clooks = require('./routes/clooks');


// Create and setup app
const app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('secretKey', 'MySuperSecretKey');

// MongoDB connection error
mongoose.connection.on('error', function() {
    console.error.bind(console, 'MongoDB connection error: ');
});


// Public routes
app.use('/users', users);
app.get(['/', '/home'], function(req, res) {
    res.redirect('/clooks');
});

// Private routes
app.use('/clooks', validateUser, clooks);


// User validation
function validateUser(req, res, next) {
    jwt.verify(req.cookies['token'], req.app.get('secretKey'), function(err, decoded) {
        if (err)
            res.json({
                status: 'error',
                message: err.message,
                data: null
            });
        else {
            req.body.userId = decoded.id;
            next();
        }
    });
}


// Detect 404 error
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use(function(err, req, res, next) {
    console.log(err);
    if (err.status === 404)
        res.status(404).json({message: 'Not found'});
    else
        res.status(500).json({message: 'Something went wrong'});
});


// Listening
const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Node server listening on port ' + port);
});
