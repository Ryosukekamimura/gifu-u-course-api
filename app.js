var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var cors = require('cors')
var compression = require('compression')
var helmet = require('helmet')
var serverless = require('serverless-http')
var session = require('express-session')

// routers
var coursesRouter = require('./routes/courses');
const { default: databaseURL } = require('./databaseSettings');

// express instance
var app = express();

// Set up default mongoose connection
var mongoDB = databaseURL
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true })
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// trust first proxy
app.set('trust proxy', 1)

// express use
app.use(helmet())
app.use(compression())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(session({
  secret: 's3Cur3',
  name: 'sessionId'
}))

// course list
app.use('/api/v1', coursesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
// this use serverless()
module.exports.handler = serverless(app);
