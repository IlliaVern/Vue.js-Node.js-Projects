var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Library App' });
});
/* GET books listing. */
router.get('/books', function(req, res, next) {
  const data = require(req.bookDir + '/books.json')
  res.render('main', {title: 'Library App', page: 'books-list', books: data.books})
});
/* GET add book page. */
router.get('/books/add', function(req, res, next){
  res.render('main', {title: 'Library App', page: 'add-book'})
})
/* GET edit book page. */
router.get('/books/edit/:bookId', function(req, res, next){
  const data = require(req.bookDir + '/books.json')
  res.render('main', {title: 'Library App', page: 'edit-book', books: data.books, 
  id: req.params.bookId})
})
/* GET filtered book page. */
router.get('/books/filter', function(req, res, next){
  const data = require(req.bookDir + '/books.json')
  if (req.query.author) {
    res.render('main', {title: 'Library App', page: 'books-list', 
  books: data.books.filter(book => book.author === req.query.author)})
  } else if (req.query.year) {
    res.render('main', {title: 'Library App', page: 'books-list', 
    books: data.books.filter(book => book.year === req.query.year)})
    } else res.render('main', {title: 'Library App', page: 'books-list', 
    books: data.books})
})
/* POST add book page. */
router.post('/books/add',
[
  check('title').isLength({min:2}).bail().withMessage('Название должно быть длиннее 2-х букв'),
  check('author').isLength({min:5}).bail().isString({min:5}).bail().withMessage('Имя и фамилия автора должны быть текстом и длиннее 5-ти букв'),
  check('year').isFloat({min: 0, max: 2020 }).withMessage('Год написания должен быть от 0 до 2020')
],
function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({success:false, err:{msg:errors.array().map(e=>e.msg).join(', ')}})
  }
  else {
    const data = require(req.bookDir + '/books.json')
    data.books.push({
      title: req.body.title,
      author: req.body.author,
      year: req.body.year
    })
    var fs = require('fs')
    fs.writeFile(req.bookDir + '/books.json', JSON.stringify(data), function(err){
      if (err) res.json({success:false, err: {msg:"Ошибка при записывании файла"}});
      res.json({success:true, msg:"Сохранено"});
    })
  }
})

/* POST edit book page. */
router.post('/books/edit',
[
  check('id').isLength({min:0}).withMessage('Відсутній id'),
  check('title').isLength({min:2}).bail().withMessage('Название должно быть длиннее 2-х букв'),
  check('author').isLength({min:5}).bail().isString({min:5}).bail().withMessage('Имя и фамилия автора должны быть текстом и длиннее 5-ти букв'),
  check('year').isFloat({min: 0, max: 2020 }).withMessage('Год издания должен быть от 0 до 2020')
],
function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({success:false, err:{msg:errors.array().map(e=>e.msg).join(', ')}})
  }
  else {
    const data = require(req.bookDir + '/books.json')
    data.books[req.body.id].title = req.body.title,
    data.books[req.body.id].author = req.body.author,
    data.books[req.body.id].year = req.body.year
    
    var fs = require('fs')
    fs.writeFile(req.bookDir + '/books.json', JSON.stringify(data), function(err){
      if (err) res.json({success:false, err: {msg:"Ошибка при записывании файла"}});
      res.json({success:true, msg:"Сохранено"});
      console.log('Saved!');
    })
  }
})
/* POST filter book page. */
// router.post('/books/filter',
// [
//   check('searchWord').isLength({min:2}).withMessage('Enter search word')
// ],
// function(req, res, next) {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.json({success:false, err:{msg:errors.array().map(e=>e.msg).join(', ')}})
//   }
//   else {
//     const data = require(req.bookDir + '/books.json')
    
//     data.books = data.books.filter(book => book.searchBy === searchWord)
//     res.render('main', {title: 'Library App', page: 'books-list', books: data.books, 
//   searchBy: req.body.searchBy, searchWord: req.body.searchWord})
//   }
// })


module.exports = router;
