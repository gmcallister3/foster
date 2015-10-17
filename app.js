var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
 
/* 
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for 
 * plenty of time in most operating environments.
 */
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };       
 
/*
 * Mongoose uses a different connection string format than MongoDB's standard.
 * Use the mongodb-uri library to help you convert from the standard format to
 * Mongoose's format.
 */
var mongodbUri = 'mongodb://gmcallister:hack15@ds042898.mongolab.com:42898/MongoLab-v';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connect(mongooseUri, options);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
    // var DonatorSchema = mongoose.Schema({
    //     name: String
    // });
    // kittySchema.methods.speak = function () {
    //     var greeting = this.name
    //     ? "Meow name is " + this.name
    //     : "I don't have a name";
    //     console.log(greeting);
    // }

    // var Kitten = mongoose.model('Kitten', kittySchema);
    // var silence = new Kitten({ name: 'Silence' });
    //     console.log(silence.name); // 'Silence'

    // var fluffy = new Kitten({ name: 'fluffy' });
    // fluffy.speak(); // "Meow name is fluffy"

    // fluffy.save(function (err, fluffy) {
    //     if (err) return console.error(err);
    //     fluffy.speak();
    // });

    // Kitten.find(function (err, kittens) {
    //     if (err) return console.error(err);
    //     console.log(kittens);
    // })
    console.log('mongoDB up');
});

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express(),
    http = require('http');

var PORT_LISTENER = 3001;
app.set('port', process.env.PORT || PORT_LISTENER);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
