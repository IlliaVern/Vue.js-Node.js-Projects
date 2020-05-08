var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var girlsRouter = require('./routes/girls')

var cors = require("cors")

var app = express();

const bodyParser = require("body-parser")
const urlencodedParser = bodyParser.urlencoded({extended:false})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(urlencodedParser)

//Додали до об"єкта запиту ще одну властивысть - корінь проєкта
app.use((req,res,next)=>{
  req.dataDir=__dirname
  next()
})

const {parseBearer} =require('./utils/token')


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

app.use((req, res, next) => {
  const openPaths = [ '/users/login', '/users/signup' ];
  if (!openPaths.includes(req.path)) {
      try {        
          req.user = parseBearer(req.headers.authorization, req.headers);
      } 
      catch (err) {
          return res.status(401).json({ result: 'Access Denied' });
      }
  }
  next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/girls', girlsRouter)

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
