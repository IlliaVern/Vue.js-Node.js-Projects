const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')
require('dotenv').config()

const usersRouter = require('./routes/users');

const app = express();

const url = "mongodb+srv://management-app-user:BUQtHjZdGCVSrit3@user-management-crud-gqu4p.mongodb.net/usersDB?retryWrites=true&w=majority"
// const url = process.env.MONGODB_URI   // показал доступ к базе так 
// //  как иначе лоокально подключаться не будет к базе если сказать репозиторий с GitHub
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extended: false})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(urlencodedParser)


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use('/', usersRouter);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
