var createError = require('http-errors');
var bodyParser = require("body-parser");
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var registerOrloginRouter = require('./routes/registerOrloginRouter');
var applicantRouter = require('./routes/applicant');
var recruiterRouter = require('./routes/recruiter');

var config = require('./config');
var app = express();
const cors = require('cors');
app.use(cors());
// connection to db


const mongoose = require('mongoose');
const url = config.mongoUrl;
const connectnow = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

connectnow.then((db) => {
  console.log("MongoDB database connected correctly to the server");
}, (err) => { console.log(err); });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', registerOrloginRouter);
app.use('/applicant', applicantRouter);
app.use('/recruiter', recruiterRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
