var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var socketIo = require('socket.io');
var cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var chatRouter = require('./routes/chat');
var messagesRouter = require('./routes/messages');

var app = express();
var server = http.createServer(app);

var io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});

// io.on('connection', (socket) => {
//   console.log('A user connected');
//   socket.on('newUser', (data)=> {
//     console.log(data)
//   })

//   socket.on('message', (data)=> {
//     console.log(data)
//     io.emit('response', data);
// });
//   socket.on('disconnect', () => {
//       console.log('A user disconnected');
//   });
// });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chat', chatRouter);
app.use('/messages', messagesRouter)

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

module.exports = {app, server, io};
