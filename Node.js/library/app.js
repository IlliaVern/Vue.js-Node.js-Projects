var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(urlencodedParser)

app.use((req, res, next)=>{
  req.bookDir = __dirname
  next()
})

app.use('/', indexRouter);

//Приклад зчитування даних з файла json
// app.get('/data',(req,res)=>{
//   const data=require(__dirname+ '/books.json')
//   res.json(data)  
// })
// Задача. Розробити додаток для бібліотеки з такими можливостями:
// 1)	зберігати інформацію про книги : автор, назва, рік видання
// 2)	виводиит усі книги на екран
// 3)	додавати книгу 
// 4)	редагувати книгу
// 5)	організувати фільтрацію за автором та роком видання

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
