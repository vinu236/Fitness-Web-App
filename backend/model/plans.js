//! importing Schema and model from mongoose using object destructuring on the fly
const { Schema, model } = require("mongoose");

const planSchema = new Schema({
  planName: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  duration: {
    type: Number, // number of months
    required: true,
  },
  price: {
    type: Number, // in dollars
    required: true,
  },
  list: {
    type: Array, // which array
  },
  Recommended: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("Plans", planSchema);
