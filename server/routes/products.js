const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose'); // using to generate ObjectIDs
const Product   = require('../models/Product').Product;

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