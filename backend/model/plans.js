//! importing Schema and model from mongoose using object destructuring on the fly
const { Schema, model } = require("mongoose");

const plansSchema=new Schema({
        planId:Schema.Types.ObjectId,
        
        planName:{
            type:String,
            required:true
        }
        ,
        
            
        
});

module.exports=model('Plans',plansSchema);
