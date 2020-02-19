const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose'); // using to generate ObjectIDs
const Cake   = require('../models/Cake').Cake;

/**
 * Functionality for this route:
 *  C   POST    /Cakes/        Create a new Cake
 *  R   GET     /Cakes         Gets an array of all Cakes
 *  R   GET     /Cakes/:id     Get a single Cake, by ID
 *  U   PUT     /Cakes/:id     Update a single Cake, by id
 *  D   DELETE  /Cakes/:id     Delete a single Cake, by ID
 */

// GET an array of all Cakes change
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

  // GET a single cake by ID
router.get('/:id([0-9a-fA-F]{24})', (req, res) => {
  return mongoose
    .model('Cake')
    .findOne({_id: req.params.id})
    .then (cake => res.json(cake))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

// POST Create a new cake
router.post('/', (req, res) => {
  return new Cake({
    title     : req.body.title,
  })
  .save()
  .then (cake => Cake.populate(cake, {path: '_id'}))
  .then (cake => res.json(cake))
  .catch(err => res
    .status(400)
    .json({ok: false, error: err.message})
  );
});

// DELETE Delete a topic with a given ID
router.delete('/:id([0-9a-fA-F]{24})', (req, res) => {
  return Cake
    .deleteOne({_id: req.params.id})
    .then (() => res.json({'ok': true}))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

// PUT Update a cake
router.put('/:id([0-9a-fA-F]{24})', (req, res) => {
  return Cake
    .findOneAndUpdate(
      {_id: req.params.id},
      {$set: {
        title  : req.body.title,
      }},
      {new: true}
    )
    .then (cake => Cake.populate(cake, {path: '_id'}))
    .then (cake => res.json(cake))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

  module.exports = router;