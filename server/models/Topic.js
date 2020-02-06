const mongoose  = require('mongoose');
const validator = require('validator');
const User      = require('./User').User;

const SchemeConfig = {timestamps: true, skipVersioning: true};
const TopicSchema  = new mongoose.Schema({

  authoredBy: {
    type     : mongoose.Schema.Types.ObjectId,
    required : true,
    ref      : 'User'
  },

  title: {
    type      : String,
    required  : true,
    validator : value => !validator.isEmpty(value)
  },

  content: {
    type      : String,
    required  : true,
    validator : value => !validator.isEmpty(value)
  }

}, SchemeConfig);

// Make sure authoredBy is valid before an update
TopicSchema.pre('save', async function() {
  const user = await User.findOne({_id: this.authoredBy})
  if (!user) {
    throw new Error('Field authoredBy does not reference a valid User ID');
  }
});

module.exports.Topic = mongoose.model('Topic', TopicSchema);