// Models
const Product = require('../models/Product');

// Messages
const { resultMessage } = require('../general/messages'); // The function creates an object with fields success, data

// Returns a list of products
exports.productsReadList = function(req, res) {
    Product.find({})
        .then(function(products) {
            console.log(products);
            res.status(200).send(products);
        })
        .catch(function(error) {
            res.status(500).send(resultMessage(false, error));
        });
};

// Creates a product on POST
exports.productCreatePost = function(req, res) {
    // Extract the relavante data needed from the request body
    const { name, price, available, dateCreated } = req.body;
    const newProduct = new Product({
        name,
        price,
        available,
        dateCreated
    });

    newProduct.save()
        .then(function(product) {
            res.status(200).send(resultMessage(true, product));
        })
        .catch(function(error) {
            res.status(500).send(resultMessage(false, error));
        });
};

// Returns a product with the specified id on GET
exports.productReadGet = function(req, res) {
    const id = req.params.id;
    
    Product.findById(id)
        .then(function(product) {
            if (!product) {
                res.status(400).send(resultMessage(false, `Product with the id ${id} does not exist!`));
                return;
            }

            res.status(200).send(resultMessage(true, product));
        })
        .catch(function(error) {
            res.status(500).send((resultMessage(false, error)));
        });
};

// Removes the product with the specified id on DELETE
exports.productDelete = function(req, res) {
    const id = req.params.id;

    Product.findByIdAndDelete(id)
        .then(function(product) {
            if (!product) {
                res.status(400).send(resultMessage(false, `Product with the id ${id} does not exist!`));
                return;
            }

            res.status(200).send(resultMessage(true, product));
        })
        .catch(function(error) {
            res.status(500).send(resultMessage(false, error));
        });
};

// Updates the product with the specified id on POST
exports.productUpdatePost = function(req, res) {
    const id = req.params.id;
    const updateAttribs = req.body;

    // Update fields specified in the request
    Product.findByIdAndUpdate(id, { $set: updateAttribs }, { new: true })
        .then(function(product) {
            if (!product) {
                res.status(400).send(resultMessage(false, `Product with the id ${id} does not exist!`));
                return;
            }

            res.status(200).send(resultMessage(true, product));
        })
        .catch(function(error) {
            res.status(500).send(resultMessage(false, error));
        });
};
