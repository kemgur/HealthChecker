var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
 
var authRouter = require('./routes/auth');

var app = express();
 
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); //use public as a website
 
// app.use(session({ 
//     secret: '123456cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 60000 }
// }))
 

app.use('/', authRouter);
 
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
 
// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
 
//   // render the error page
//   res.status(err.status || 500);

// });
// port must be set to 3000 because incoming http requests are routed from port 80 to port 8080
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});

module.exports = app;