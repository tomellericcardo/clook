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
app.use(bodyParser.json());
app.use(cookieParser());
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('secretKey', process.env.SECRET || 'devKey');

// MongoDB connection error
mongoose.connection.on('error', function() {
    console.error.bind(console, 'MongoDB connection error: ');
});


// Static files
app.use(express.static('public'));


// Public routes

app.get('/favicon.ico', function(req, res) {
    res.status(204).end();
});

app.get('/registration', checkUser, function(req, res) {
    res.render('registration', {
        title: 'Registration',
        scripts: ['ajax', 'message', 'registration']
    });
});

app.get('/login', checkUser, function(req, res) {
    res.render('login', {
        title: 'Login',
        scripts: ['ajax', 'message', 'login']
    });
});

app.get('/logout', function(req, res) {
    res.cookie('token', {maxAge: Date.now()}).redirect('/login');
});

app.post('/register', userController.create);
app.post('/authenticate', userController.authenticate);


// Private routes

app.get('/new', validateUser, function(req, res) {
    res.render('new', {
        title: 'New clook',
        sidebar: true,
        scripts: ['ajax', 'message', 'new']
    });
});

app.get(['/', '/home'], validateUser, clookController.getClooks);
app.get('/clook/:clookId', validateUser, clookController.getClook);
app.post('/clook', validateUser, clookController.createClook);
app.put('/clook', validateUser, clookController.updateClook);
app.delete('/clook', validateUser, clookController.deleteClook);


// User validation

function checkUser(req, res, next) {
    jwt.verify(req.cookies['token'], req.app.get('secretKey'), function(err, decoded) {
        if (err) next();
        else res.redirect('/');
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
    next(err);
});

// Error handler
app.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status).render('error', {
        title: 'Error ' + err.status,
        message: err.message
    });
});


// Listening
const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Node server listening on port ' + port);
});
