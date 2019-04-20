const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// const api = require('./routes/index');

const app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.use(express.static('./build'));
// app.use('/api/v1', api);

//Serve Static Files
app.use('*', function(req, res, next) {
  console.log('HIT!');
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

/**
 * Get port from environment and store in Express.
 */

const port = process.env.PORT || '3001';
app.listen(port, () => console.log(`Server running on ${port}!`))