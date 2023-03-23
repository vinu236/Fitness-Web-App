//! Importing Schema and model from mongoose and using object destructuring to get Schema and model on the fly
const { Schema, model } = require("mongoose");

const trainerSchema = new Schema({
  trainerName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    
  },
  isActive:{
    type:Boolean,
    default:true
   
  }

  
});
module.exports = model("Trainers", trainerSchema);
