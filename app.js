var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();
var ticketsModule = require('./public/javascripts/tickets.module.js');
var isDebug = process.env.isDebug || process.argv[2] === '-dod';
var chalk = require('chalk');

console.log(isDebug ? 'Running on debug mode' : 'Running on prod mode');


function log(msg) {
    console.log(chalk.blue(new Date().toTimeString()), chalk.yellow(msg));
}

// middleware
function ticketsLog(req, res, next) {
    if (req.method === 'GET') {
        log('(DEBUG) http GET request: get tickets list');
    } else if (req.method === 'POST') {
        log('(DEBUG) http POST request: add a new ticket');
    }
    next();
}
function ticketsIdLog(req, res, next) {
    if (req.method === 'GET') {
        log('(DEBUG) http GET request: get ticket by id');
        log('(DEBUG) ticket id: ', req.params.id);
    } else if (req.method === 'DELETE') {
        log('(DEBUG) http DELETE request: remove a ticket');
        log('(DEBUG) ticket id: ', req.params.id);
    }
    next();
}
if (isDebug) {
    app.use(function (req, res, next) {
        next();
    });
    app.use('/tickets', ticketsLog);
    app.use('/tickets/:id', ticketsIdLog);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req,res,next) {
    req.ticketsModule = ticketsModule;
    next();
});

app.use('/', routes);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
