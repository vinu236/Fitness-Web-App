const User = require("../model/UserSignup");
const mongoose = require("mongoose");
const Trainer = require("../model/addTrainer");
const generatePassword = require("../utils/passwordGenerator");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/mailer");
const Plan = require("../model/plans");
const Booking = require("../model/Booking");
const ObjectId = mongoose.Types.ObjectId;
const Conversation=require("../model/Conversation")
//! Load environment variables from .env file
require("dotenv").config();

exports.postLogin = async = (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(process.env.ADMIN_password);
    //!early return
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      //unauthorized
      res.status(401);
      throw new Error("Admin Credentials are not valid");
    }
    res.status(200).json({ success: true });
  } catch (error) {
    throw new Error(error);
  }
};

exports.getTrainees = async (req, res) => {
  try {
    //get all user data
    const getTrainees = await User.find({});

    if (!getTrainees) {
      res.status(401);
      throw new Error("User data is not found");
    }
    res.status(200).json(getTrainees);
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
      res.status(401);
      throw new Error(`User ${id} id is not found`);
    }
    res.status(200).json(updateUser);
  } catch (error) {
    throw new Error(error);
  }
};

exports.getTrainers = async (req, res) => {
  try {
    //get all Trainers
    const getTrainers = await Trainer.find({});
    if (!getTrainers) {
      res.status(401);
      throw new Error("Trainers not Found");
    }
    res.status(200).json(getTrainers);
  } catch (error) {
    console.log(error);
  }
};
exports.postAddTrainer = async (req, res) => {
  try {
    const { userName, email } = req.body;
    // checking user EXIST or not if no user it will return null

    const trainerExistCheck = await Trainer.findOne({ email });

    // Check if user(trainer) already exists
    if (trainerExistCheck) {
      //conflict
      res.status(409);
      throw new Error("User already exist");
    }

    // generate Password;
    const password = generatePassword();

    //i have to hash this password and store it on the db
    const hashPassword = await bcrypt.hash(password, 10);

    // create new Trainer
    const newTrainer = await Trainer.create({
      trainerName: userName,
      email: email,
      password: hashPassword,
    });
    //send mail
    const mailSend = await sendEmail(email, password);
    res.status(201).json(newTrainer);
  } catch (error) {
    throw new Error(error);
  }
};

exports.trainerBlock = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;
    const updateTrainer = await Trainer.findByIdAndUpdate(
      id,
      { isActive: isActive },
      { new: true }
    );
    if (!updateTrainer) {
      res.status(401);
      throw new Error(`User${id} is not found`);
    }
    res.status(200).json(updateTrainer);
  } catch (error) {
    throw new Error(error);
  }
};

/* ===================================================Plans-Section=======++++++++================================ */

//adding plans Controller
exports.addPlan = async (req, res) => {
  try {
    const { planName, heading, price, duration, list, Recommended } = req.body;
    const img={
      url:req.file.path,
      filename:req.file.filename
    }
    const data = await Plan.create({
      planName,
      heading,
      duration,
      price,
      list,
      Recommended,
      img
    });
    res.status(201).json({
      data,
      message: "successfully created",
    });
  } catch (error) {
    console.log(error);
  }
};

//getting plan from the Plan DB
exports.getPlans = async (req, res) => {
  try {
    const data = await Plan.find({});
    if (!data) {
      const err = new Error("No Plans Found");
      err.status = 404;
      return next(err);
    }
    res.status(200).json({
      data,
      message: "successfully get the data",
    });
  } catch (error) {
    throw new Error(error);
  }
};

//deleting plans
exports.deletePlans = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const data = await Plan.findByIdAndDelete(id);

    res.status(200).json({
      data,
      message: "deleted Successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.getPlanDetails = async (req, res) => {
  try {
    console.log("hasdkhakj");
    const { id } = req.params;
    console.log(id);

    const data = await Plan.findById(id.trim());
    console.log(data);
    res.json({
      data,
      message: "Data Successfully fetched",
    });
  } catch (error) {
    throw new Error(error);
  }
};

/* =========================================Bookings========================================================= */

exports.getBookings = async (req, res) => {
  try {
    console.log("vinadajshgdjkahgsdkjhakjsdhkahsdkhaksdhkahsdkahksdhaksdhkashdkashkjdhkajshdk")
    const bookingData = await Booking.find({})
      .populate("Plan")
      .populate({
        path: "user",
        select: "userName email plan",
      })
      .populate("trainer");
    res.status(200).json(bookingData);
  } catch (error) {
    throw new Error(error);
  }
};

exports.getUserBooking = async (req, res, next) => {
  try {

    const { id } = req.params;
    console.log(id);

    if (!id) {
      const err = new Error("Booking ID is not provided");
      err.status = 400;
      return next(err);
    }
    const userBooking = await Booking.findById(id.trim())
      .populate("Plan")
      .populate({
        path: "trainer",
        select: "trainerName",
      });
    if (!userBooking) {
      const err = new Error("User is not Found");
      err.status = 404;
      return next(err);
    }
    res.status(200).json(userBooking);
  } catch (err) {
    throw new Error(err);
  }
};

exports.patchBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { trainer_id } = req.body;

    console.log(id);
    console.log(trainer_id)
    const updateTrainer = await Booking.findByIdAndUpdate(id, { $set: { trainer: trainer_id } },{ new: true });
    console.log(updateTrainer);
    if (!updateTrainer) {
      const err = new Error("cannot update the trainer");
      err.status = 404;
      return next(err);
    }

    //TODO: MAKE IT DYNAMIC SENDER ID AND RECEIVER ID
    // const conversationAdd = await Conversation.create({
    //   members: ["641fab04bfbcc902a424ba87", "640b1648a026378f1eab8858"]
    // });

    // const conversationAdd = await Conversation.create({
    //   members: ["641fab04bfbcc902a424ba87", "640b1648a026378f1eab8858"]
    // });

    


    res.status(201).json({
      updateTrainer,
      message: "updated Successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
};


//*=========================Bookings=====================================================*//

exports.getPlansCount=async(req,res)=>{
  try {
    const getCount=await Plan.find({}).count();
    res.status(200).json({
      message:"Plans Counted Successfully",
      getCount
    })
  } catch (error) {
    console.log(error)
  }
}

exports.getBookingsCount=async(req,res)=>{
  try {
    const getCount=await Booking.find({}).count();
    res.status(200).json({
      message:"Bookings Counted Successfully",
      getCount
    })
  } catch (error) {
    console.log(error)
  }
}


exports.getTraineesCount=async(req,res)=>{
  try {
    const getCount=await User.find({}).count();
    res.status(200).json({
      message:"Trainees Counted Successfully",
      getCount
    })
  } catch (error) {
    console.log(error)
  }
}


exports.getTrainersCount=async(req,res)=>{
  try {
    const getCount=await Trainer.find({}).count();
    res.status(200).json({
      message:"Trainers Counted Successfully",
      getCount
    })
  } catch (error) {
    console.log(error)
  }
}