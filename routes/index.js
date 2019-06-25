const express = require('express');
const router = express.Router();

// Controller modules
var productController = require('../controllers/productController');

router.get('/', function(req, res) {
    res.send("Hello world");
})

// Returns a list of products
router.get('/products', productController.productsReadList);

// Creates a product
router.post('/product', productController.productCreatePost);

// Returns a product with the specified id
router.get('/product/:id', productController.productReadGet);

// Removes the product with the specified id
router.delete('/product/:id', productController.productDelete);

// Updates the product with the specified id
router.put('/product/:id', productController.productUpdatePost);

module.exports = router;