const mongoose  = require('mongoose');
const validator = require('validator');

const SchemeConfig = {timestamps: true, skipVersioning: true};
const ProductSchema  = new mongoose.Schema({
  
    title: {
      type      : String,
      required  : true,
      validator : value => !validator.isEmpty(value)
    },
  
  }, SchemeConfig);

  module.exports.Product = mongoose.model('Product', ProductSchema);