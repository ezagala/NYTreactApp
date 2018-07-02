var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route for testing purposes only
app.get('/api/user', (req, res) => {
  res.status(200).json({username: "Eric Z."}); 
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + 'public/index.html')); 
}); 

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
});

const port = process.env.PORT || '3001';

app.listen(port, () => {
  console.log("Server started on port: " + port ); 
}); 

module.exports = app;
