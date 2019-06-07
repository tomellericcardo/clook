// Required modules
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const jwt = require('jsonwebtoken');
const mongoose = require('./config/database');
const userController = require('./controllers/users');
const clookController = require('./controllers/clooks');


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


// Static files
app.use(express.static('public'));


// Public routes

app.get(['/', '/home'], function(req, res) {
    res.redirect('/clooks');
});

app.get('/registration', checkUser, function(req, res) {
    res.render('registration');
});

app.get('/login', checkUser, function(req, res) {
    res.render('login');
});

app.post('/register', userController.create);
app.post('/authenticate', userController.authenticate);


// Private routes

app.get('/new', validateUser, function(req, res) {
    res.render('new');
});

app.get('/clooks', validateUser, clookController.getClooks);
app.post('/clook', validateUser, clookController.createClook);
app.get('/clook/:clookId', validateUser, clookController.getClook);
app.put('/clook/:clookId', validateUser, clookController.updateClook);
app.delete('/clook/:clookId', validateUser, clookController.deleteClook);


// User validation

function checkUser(req, res, next) {
    jwt.verify(req.cookies['token'], req.app.get('secretKey'), function(err, decoded) {
        if (err) next();
        else res.redirect('/clooks');
    });
}

function validateUser(req, res, next) {
    jwt.verify(req.cookies['token'], req.app.get('secretKey'), function(err, decoded) {
        if (err) res.redirect('/login');
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
    next (err);
});

// Error handler
app.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status).render('error', {status: err.status});
});


// Listening
const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Node server listening on port ' + port);
});
