const createError    = require('http-errors');
const express        = require('express');
const cookieParser   = require('cookie-parser');
const logger         = require('morgan');
const topicsRouter   = require('./routes/topics');
const commentsRouter = require('./routes/comments');
const app            = express();
const mongoose       = require('mongoose');
const config         = require('./config.json');

// Basic application-level middleware set-up
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// Connect to Mongo
mongoose
  .connect(config.mongoConnectionString, {
    useNewUrlParser    : true,
    useUnifiedTopology : true
  })
  .then (() => console.log('Successfully connected to mongodb'))
  .catch(err => {
    console.log(`Error connecting to mongo with message ${err.message || None}`);
    process.exit(1);
  });

// Set CORS header to allow access from other domains
// Global middleware & * -- not safe, but easy for example
app.use(function(req, res, next) {
  res.set('Access-Control-Allow-Origin',  '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.set('Access-Control-Allow-Headers', 'Content-Type')
  next();
});

// Add routers as application middleware
// Note 2 routers, one for each data resource (topics and comments)
app.use('/topics',   topicsRouter);
app.use('/comments', commentsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler (very generic, needs improvement)
app.use(function(err, req, res, next) {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({status: err.status, message: err.message});
});

module.exports = app;
