//! Importing Schema from mongoose and using destructuring to get Schema on the fly
const {Schema,model}=require("mongoose");

const bmiSchema = new Schema({
    value: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      enum: ['Underweight', 'Normal', 'Overweight', 'Obese Class I', 'Obese Class II', 'Obese Class III'],
      required: true
    },
    
   
  });
  


const userSignUpSchema=new Schema({

    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isActive:{
        type:Boolean,
        default:true
    }
    ,
    proImgUrl:{
        type:String
    },
    Age:{
        type:Number
    },
    Bmi:[bmiSchema],
    
    plan:{
        type:Boolean,
        default:false
    },
    planName:{
        type:String,
    },
    otp:{
        type:Number
    },
    verified:{
        type:Boolean,
        default:false
    }


    // timestamps: true
    
});


module.exports=model('Users',userSignUpSchema)