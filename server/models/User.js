const mongoose     = require('mongoose');
const validator    = require('validator');

const SchemeConfig = {timestamps: true, skipVersioning: true};
const UserSchema   = new mongoose.Schema({

  username: {
    type     : String,
    required : true,
    unique   : true,
    validator: value => !validator.isEmpty(value)
  },

  email: {
    type     : String,
    required : true,
    unique   : true,
    validator: value => validator.isEmail(value)
  }

}, SchemeConfig);

module.exports.User = mongoose.model('User', UserSchema);