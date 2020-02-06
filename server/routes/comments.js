const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose'); // using to generate ObjectIDs
const Comment  = require('../models/Comment').Comment;

/**
 * Functionality for this route:
 *  C   POST    /comments/            Create a new comment
 *  R   GET     /comments             Gets an array of all comments
 *  R   GET     /comments?forTopic=x  Gets an array of all comments that are for topic with ID x
 *  R   GET     /comments/:id         Get a single comment, by ID
 *  U   PUT     /comments/:id         Update a comment, by id
 *  D   DELETE  /comments/:id         Delete a single comment, by ID
 */

// GET an array of all comments, or all comments for a given forTopic
router.get('/', (req, res) => {
  return mongoose
    .model('Comment')
    .find({forTopic: req.query.forTopic || {$exists: true}})
    .populate('authoredBy')
    .then (comments => res.json(comments))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

// GET a single comment by ID
router.get('/:id([0-9a-fA-F]{24})', (req, res) => {
  return mongoose
    .model('Comment')
    .findOne({_id: req.params.id})
    .populate('authoredBy')
    .then (comment => res.json(comment))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

// POST Create a new comment
router.post('/', (req, res) => {
  return new Comment({
    authoredBy: req.body.authoredBy,
    forTopic  : req.body.forTopic,
    content   : req.body.content
  })
  .save()
  .then (comment => Comment.populate(comment, {path: 'authoredBy'}))
  .then (comment => res.json(comment))
  .catch(err => res
    .status(400)
    .json({ok: false, error: err.message})
  );
});

// DELETE Delete a comment with a given ID
router.delete('/:id([0-9a-fA-F]{24})', (req, res) => {
  return Comment
    .deleteOne({_id: req.params.id})
    .then (() => res.json({'ok': true}))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

// PUT Update a topic
router.put('/:id([0-9a-fA-F]{24})', (req, res) => {
  return Comment
    .findOneAndUpdate(
      {_id: req.params.id},
      {$set: {
        content: req.body.content
      }},
      {new: true}
    )
    .then (() => res.json({'ok': true}))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

module.exports = router;
