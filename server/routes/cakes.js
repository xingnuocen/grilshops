const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose'); // using to generate ObjectIDs
const Cake   = require('../models/Cake').Cake;

/**
 * Functionality for this route:
 *  C   POST    /Cakes/        Create a new Cake
 *  R   GET     /Cakes         Gets an array of all Cakes
 *  R   GET     /Cakes/:id     Get a single Cake, by ID
 *  U   PUT     /Cakes/:id     Update a Cake, by id
 *  D   DELETE  /Cakes/:id     Delete a single Cake, by ID
 */

// GET an array of all Cakes
router.get('/', (req, res) => {
    return mongoose
      .model('Cake')
      .find({})
      .then (cakes => res.json(cakes))
      .catch(err => res
        .status(500)
        .json({ok: false})
      );
  });

  module.exports = router;