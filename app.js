// Required modules
const express = require('express');
const logger = require('morgan');
const cookie_parser = require('cookie-parser');
const exphbs = require('express-handlebars');
const mongoose = require('./config/database');
const user_routes = require('./routes/users');
const clook_routes = require('./routes/clooks');


// Create and setup app
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(cookie_parser());
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('secret', process.env.SECRET || 'dev');


// Static files
app.use(express.static('public'));

// Users routes
app.use('/users', user_routes);

// Clooks routes
app.use('/clooks', clook_routes);

// About page
app.get('/about', function(req, res) {
    res.render('about', {
        back: true,
        title: 'About'
    });
});

// Root redirect
app.get('/', function(req, res) {
    res.redirect('/clooks');
});


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
        back: true,
        title: 'Error ' + err.status,
        message: err.message
    });
});


// Listening
const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Node server listening on port ' + port);
});
