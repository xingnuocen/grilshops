const mongoose = require('mongoose');
const User     = require('../models/User').User;
const Topic    = require('../models/Topic').Topic;
const Comment  = require('../models/Comment').Comment;
const config   = require('../config.json');

// Connect to Mongo
mongoose
  .connect(config.mongoConnectionString, {
    useNewUrlParser    : true,
    useUnifiedTopology : true
  })

  // Delete all values currently in there
  .then (() => User.deleteMany({}))
  .then (() => Topic.deleteMany({}))
  .then (() => Comment.deleteMany({}))

  // Add new seed values
  .then(() => User.insertMany([
    {
      "_id"       : "5e2dfaf1c381febcbfc2278c",
      "username"  : "User One",
      "email"     : "user1@example.com",
    }, {
      "_id"       : "5e2dfaf7ed6b865fce913c3b",
      "username"  : "User Two",
      "email"     : "user2@example.com"
    }
  ]))
  .then(() => Topic.insertMany([
    {
      "_id"       : "5e2df92ada6059b1ff3d2e39",
      "authoredBy": "5e2dfaf1c381febcbfc2278c",
      "title"     : "Title of Topic One",
      "content"   : "Topic one content."
    },
    {
      "_id"       : "5e2df92a85244e3cbf21bc04",
      "authoredBy": "5e2dfaf1c381febcbfc2278c",
      "title"     : "Title of Topic Two",
      "content"   : "Topic two content"
    },
    {
      "_id"       : "5e2df92a2675e191d9f50942",
      "authoredBy": "5e2dfaf7ed6b865fce913c3b",
      "title"     : "Title of Topic Three",
      "content"   : "Topic three content."
    },
    {
      "_id"       : "5e2df92a853345c4cf7e5eae",
      "authoredBy": "5e2dfaf1c381febcbfc2278c",
      "title"     : "Title of Topic Four",
      "content"   : "Topic four content."
    },
    {
      "_id"       : "5e2df92ad41b2ca180516c8d",
      "authoredBy": "5e2dfaf7ed6b865fce913c3b",
      "title"     : "Title of Topic Five",
      "content"   : "Topic five content."
    }
  ]))
  .then(() => Comment.insertMany([
    {
      "_id"       : "5e2df92ada6059b1ff3d2e40",
      "authoredBy": "5e2dfaf1c381febcbfc2278c",
      "forTopic"  : "5e2df92ada6059b1ff3d2e39",
      "content"   : "First comment. Made about topic one"
    },
    {
      "_id"       : "5e2df92ada6059b1ff3d2e41",
      "authoredBy": "5e2dfaf1c381febcbfc2278c",
      "forTopic"  : "5e2df92a2675e191d9f50942",
      "content"   : "Second comment, made about topic three"
    },
    {
      "_id"       : "5e2df92ada6059b1ff3d2e42",
      "authoredBy": "5e2dfaf7ed6b865fce913c3b",
      "forTopic"  : "5e2df92a2675e191d9f50942",
      "content"   : "Third comment, also made about topic three"
    }
  ]))
  .then(() => {
    console.log('Database seeded');
    process.exit(0);
  })
  .catch(err => {
    console.log(`Error connecting to mongo with message ${err.message || None}`);
    process.exit(1);
  });