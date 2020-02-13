const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose'); // using to generate ObjectIDs
const Product   = require('../models/Product').Product;

/**
 * Functionality for this route:
 *  C   POST    /products/        Create a new product
 *  R   GET     /products         Gets an array of all products
 *  R   GET     /products/:id     Get a single product, by ID
 *  U   PUT     /products/:id     Update a product, by id
 *  D   DELETE  /products/:id     Delete a single product, by ID
 */

// GET an array of all products
router.get('/', (req, res) => {
    return mongoose
      .model('Product')
      .find({})
      .then (products => res.json(products))
      .catch(err => res
        .status(500)
        .json({ok: false})
      );
  });

  module.exports = router;