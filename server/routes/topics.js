const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose'); // using to generate ObjectIDs
const Topic    = require('../models/Topic').Topic;

/**
 * Functionality for this route:
 *  C   POST    /topics/        Create a new topic
 *  R   GET     /topics         Gets an array of all topics
 *  R   GET     /topics/:id     Get a single topic, by ID
 *  U   PUT     /topics/:id     Update a topic, by id
 *  D   DELETE  /topics/:id     Delete a single topic, by ID
 */

// GET an array of all topics
router.get('/', (req, res) => {
  return mongoose
    .model('Topic')
    .find({})
    .populate('authoredBy')
    .then (topics => res.json(topics))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

// GET a single topic by ID
router.get('/:id([0-9a-fA-F]{24})', (req, res) => {
  return mongoose
    .model('Topic')
    .findOne({_id: req.params.id})
    .populate('authoredBy')
    .then (topic => res.json(topic))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

// POST Create a new topic
router.post('/', (req, res) => {
  return new Topic({
    authoredBy: req.body.authoredBy,
    title     : req.body.title,
    content   : req.body.content
  })
  .save()
  .then (topic => Topic.populate(topic, {path: 'authoredBy'}))
  .then (topic => res.json(topic))
  .catch(err => res
    .status(400)
    .json({ok: false, error: err.message})
  );
});

// DELETE Delete a topic with a given ID
router.delete('/:id([0-9a-fA-F]{24})', (req, res) => {
  return Topic
    .deleteOne({_id: req.params.id})
    .then (() => res.json({'ok': true}))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

// PUT Update a topic
router.put('/:id([0-9a-fA-F]{24})', (req, res) => {
  return Topic
    .findOneAndUpdate(
      {_id: req.params.id},
      {$set: {
        title  : req.body.title,
        content: req.body.content
      }},
      {new: true}
    )
    .then (topic => Topic.populate(topic, {path: 'authoredBy'}))
    .then (topic => res.json(topic))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

module.exports = router;
