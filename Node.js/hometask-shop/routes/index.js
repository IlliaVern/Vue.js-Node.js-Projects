var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home page', shopName: 'Products shop', });
});

/* GET products page. */
router.get('/products', function (req, res, next) {
  res.render('products', {
    shopName: 'Products shop',
    products: [{
        productTitle: 'Rice',
        price: 38,
        description: 'The best basmati rice'
      },
      {
        productTitle: 'Spaghetti',
        price: 32,
        description: 'Perfect spaghetti from Italy'
      }]
  });
});

/* GET addproduct page. */
router.get('/addproduct', function(req, res) {
  res.render('addproduct', {shopName: 'Products shop',})
})


module.exports = router;
