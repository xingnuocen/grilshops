const mongoose  = require('mongoose');
const validator = require('validator');
const User      = require('./User').User;
const Topic     = require('./Topic').Topic;


const SchemeConfig = {timestamps: true, skipVersioning: true};
const CommentSchema  = new mongoose.Schema({

  authoredBy: {
    type     : mongoose.Schema.Types.ObjectId,
    required : true,
    ref      : 'User'
  },

  forTopic: {
    type     : mongoose.Schema.Types.ObjectId,
    required : true,
    ref      : 'Topic'
  },

  content: {
    type      : String,
    required  : true,
    validator : value => !validator.isEmpty(value)
  }

}, SchemeConfig);

// Make sure authoredBy and forTopic are valid before an update
CommentSchema.pre('save', async function() {

  const user = await User.findOne({_id: this.authoredBy})
  if (!user) {
    throw new Error('Field authoredBy does not reference a valid User ID');
  }

  const topic = await Topic.findOne({_id: this.forTopic})
  if (!topic) {
    throw new Error('Field forTopic does not reference a valid Topic ID');
  }

});

module.exports.Comment = mongoose.model('Comment', CommentSchema);