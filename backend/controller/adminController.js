const User = require("../model/UserSignup");
const Trainer = require("../model/addTrainer");
const generatePassword=require("../utils/passwordGenerator")
const bcrypt=require("bcrypt");
const sendMail=require("../utils/mailer");
const sendEmail = require("../utils/mailer");
//! Load environment variables from .env file
require('dotenv').config();

exports.postLogin=async=(req,res)=>{
  try {
      const{email,password}=req.body
      console.log(process.env.ADMIN_password);
      //!early return
      if(email!==process.env.ADMIN_EMAIL || password!==process.env.ADMIN_PASSWORD){
        //unauthorized  
        res.status(401);
        throw new Error("Admin Credentials are not valid")
      }
      res.status(200).json({success:true})
  } catch (error) {
      throw new Error(error)
  }
}


exports.getTrainees = async (req, res) => {
  try {
    
    //get all user data
    const getTrainees = await User.find({});
   
    if (!getTrainees) {
      req.status(401)
      throw new Error("User data is not found");
    }
    res.status(200).json(
      
      getTrainees,
    );
  } catch (error) {
    throw new Error(error);
  }
};

exports.userBlock = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;
    //update user
    const updateUser = await User.findByIdAndUpdate(
      id,
      { isActive: isActive },
      { new: true }
    );

    //if user is not found throw an error
    if (!updateUser) {
      res.status(401)
      throw new Error(`User ${id} id is not found`);
    }
    res.status(200).json(
      
      updateUser,
    );
  } catch (error) {
    throw new Error(error);
  }
};

exports.getTrainers = async (req, res) => {
  try {
    //get all Trainers
    const getTrainers = await Trainer.find({});
    if (!getTrainers) {
      res.status(401)
      throw new Error("Trainers not Found");
    }
    res.status(200).json(
     
     getTrainers,
    );
  } catch (error) {
    console.log(error);
  }
};
exports.postAddTrainer = async (req, res) => {
  try {
    const { userName, email } = req.body;
    console.log(req
      .body)  
      // checking user EXIST or not if no user it will return null
      
    const trainerExistCheck = await Trainer.findOne({ email });
    console.log(trainerExistCheck)


    // Check if user(trainer) already exists
    if (trainerExistCheck) {
     
      //conflict
      res.status(409)
      throw new Error("User already exist");
    }

    // generate Password;
   const password= generatePassword();

   //i have to hash this password and store it on the db 
   const hashPassword=await bcrypt.hash(password,10);

    // create new Trainer
    const newTrainer = await Trainer.create({
      trainerName: userName,
      email: email,
      password: hashPassword,
    });
    //send mail
    const mailSend=await sendEmail(email,password)
    res.status(201).json( newTrainer);
  } catch (error) {
    throw new Error(error);
  }
};


exports.trainerBlock = async (req, res) => {
  console.log("sdakshdkjshakdhkashkdhk")
  try {
    const { id } = req.params;
    const { isActive } = req.body;
    const updateTrainer = await Trainer.findByIdAndUpdate(
      id,
      { isActive: isActive },
      { new: true }
    );
    if (!updateTrainer) {
      res.status(401)
      throw new Error(`User${id} is not found`);
    }
    res.status(200).json(updateTrainer);
  } catch (error) {
    throw new Error(error);
  }
};


