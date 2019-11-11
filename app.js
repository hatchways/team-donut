var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

// var indexRouter = require('./routes/index');
// var pingRouter = require('./routes/ping');
var profileRouter = require( './routes/api/profile' );

var router = express.Router();
var app = express();

require('dotenv').config();

//connecting string is saved in config folder inside default.json
// var db = config.get('mongoConn');

/**
 * Configure the middleware.
 * bodyParser.json() returns a function that is passed as a param to app.use() as middleware
 * With the help of this method, we can now send JSON to our express application.
 */
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );

// mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, err => 
//   err ? console.log('Error: ', err) : console.log('MongoDB is connected!'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// app.use('/', indexRouter);
// app.use('/ping', pingRouter);
app.use( '/api/profile', profileRouter );

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

//listening to this port 
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {console.log('server started')});

module.exports = router;
