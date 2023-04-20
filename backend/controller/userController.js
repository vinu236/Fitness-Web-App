const User = require("../model/UserSignup");
const jwtToken = require("../middleware/Auth");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Booking = require("../model/Booking");
const plans = require("../model/plans");
const uuid = require("uuid").v4;
const { addMonths } = require("date-fns");
const Conversation = require("../model/Conversation");
const Message = require("../model/Message");
const stripe = require("stripe")(
  "sk_test_51MsNZtSBVtOTQeiMSNdAZoS3jAuraFmQ9vFrbuYa2Hgfsf0xEmHOHgkuKedaGY2l4SGKm9D5gMpycqOpkVBAbzqW00uojv2XVJ"
);
const crypto = require("crypto");
const sendEmail = require("../utils/mailer");

exports.getSignUp = (req, res) => {
  res.status(200).json("Welcome to Signup Page");
};

exports.postSignup = async (req, res, next) => {
  try {
    //generate Otp

    const generateOTP = () => {
      const otp = crypto.randomInt(100000, 1000000); // Generate a random number between 100000 and 999999
      return otp.toString().padStart(6, "0"); // Convert to string and pad with leading zeros if needed
    };

    const otp = generateOTP(); // Call the function to generate OTP

    const { username, email, password } = req.body;
    console.log(req.body);

    const userCheck = await User.findOne({ email: email });
    if (userCheck) {
      const err = new Error("User already Exist");
      err.status = 409;
      return next(err);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const data = await User.create({
      userName: username,
      email: email,
      password: hashPassword,
      otp: otp,
    });

    if (data) {
      const mailSend = await sendEmail(email, otp);
      return res.status(201).json(data);
    }
  } catch (err) {
    next(err);
  }
};

//verify Otp
exports.postVerifyOtp = async (req, res) => {
  try {
    const { Otp, email } = req.body;
    const userFind = await User.findOne({ email });
    console.log(userFind);
    if (userFind.otp === Otp) {
      const verifyUser = await User.updateOne(
        { email },
        { $set: { verified: true }, $unset: { otp: "" } },
        { new: true }
      );
      console.log(verifyUser);
      res.status(201).json({
        user: verifyUser,
        message: "Account created successfully",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getLogin = (req, res) => {
  res.status(200).json("Welcome to home Page");
};

exports.postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const userCheck = await User.findOne({ email });
    console.log(userCheck);

    // retrieve the hashed password from the database
    //!early return
    if (
      !userCheck ||
      userCheck === null ||
      !(await bcrypt.compare(password, userCheck.password))
    ) {
      const err = new Error("Invalid User! or Password");
      console.log("haskdjhjkh");
      err.status = 404;
      return next(err);
    }
    console.log("vinayak");
    const userActiveCheck = await User.findOne({ email: email });
    console.log(userActiveCheck);
    if (!userActiveCheck.isActive) {
      //res('User is Blocked')
      return res.json({
        isBlocked: userActiveCheck.isActive,
        message: "User is Blocked",
      });
    }
    //! Generate token
    const accessToken = jwtToken.generateAccessToken(userCheck);
    res.status(200).json({
      uid: userCheck._id,
      email: userCheck.email,
      isAdmin: userCheck.isAdmin,
      traineeToken: accessToken,
      isBlocked:userCheck.isActive
    });
  } catch (error) {
    //  next(error);
    throw new Error(error);
  }
};

exports.getUser = async (req, res) => {
  try {
    //! destructing the id params;
    const { id } = req.params;
    console.log(id);
    // //! Convert the id parameter to a valid ObjectId
    // const uId = mongoose.Types.ObjectId(id);
    // console.log(uId);
    //! find the  user id from the User collection and project the data that i want (second argument)
    const getUser = await User.findById(
      id,
      { userName: 1, email: 1, plan: 1, planName: 1, userName: 1, Bmi: 1 ,isActive:1},
      { new: true }
    );

    //!if the getUser is null=> throw an Error
    if (!getUser) {
      throw new Error("User is not Found");
    }

    //!user is found with status code success 200 ok
    res.status(200).json({
      success: true,
      getUser,
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    //! destructing current password and confirm password from the req.body;
    const { currentPassword, newPassword } = req.body;
    //!convert id param to objectId
    const uid = mongoose.Types.ObjectId(id);

    //! check user is exists or not in the db
    const getUser = await User.findById(uid);
    //! if not throw Error
    if (!getUser) {
      throw new Error("User is not found");
    }
    //! checking current password with password which already on the db
    const passwordMatch = await bcrypt.compare(
      currentPassword,
      getUser.password
    );
    console.log("testing");
    //! if password is not match throw error
    if (!passwordMatch) {
      throw new Error("User Password is not match");
    }
    //! after successfully compare the password the then i hashing the password
    const hashPassword = await bcrypt.hash(newPassword, 10);

    //!after hashing the password im updating my hashed password in the with corresponding user id
    const updatePassword = await User.findByIdAndUpdate(uid, {
      password: hashPassword,
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
};

/*================================BMI Section=========================================  */

exports.addBmi = async (req, res) => {
  try {
    console.log("asjdhad");
    const { id } = req.params;
    const { bmiValue, bmiType } = req.body;
    console.log(bmiValue);
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $push: { Bmi: { value: bmiValue, type: bmiType } } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      updatedUser,
      message: "BMI value added successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

/* ==================================================Bookings===================================================== */

exports.addBooking = async (req, res) => {
  try {
    //these are coming from the json for handle that i have use a middleware on the app.js express.json()
    const { features, token, uid } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    // const idempotencyKey=uuid()
    // console.log(idempotencyKey)
    // console.log(features.price)

    //TODO: payment problem

    if (!customer) {
      res.json({
        err: "Something Happened",
      });
    }

    const plan = await plans.findById(features._id, { duration: 1 });

    if (!plan) {
      const err = new Error("Plan is not Found");
      err.status = 404;
      return next(err);
    }
    const now = new Date();
    const expirationDate = addMonths(now, plan.duration);
    console.log(expirationDate);

    const createBooking = await Booking.create({
      Plan: features._id,
      user: uid,
      expirationDate: expirationDate,
    });

    console.log(createBooking);

    if (createBooking) {
      const updatedUser = await User.findByIdAndUpdate(uid, {
        plan: true,
        planName: features.planName,
      });

      if (!updatedUser) {
        const err = new Error("User is not updated");
        err.status = 304;
        return next(err);
      }

      res.status(200).json({
        message: "successfully updated",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.userBookingHistory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      const err = new Error("Id is not Found");
      err.status = 200;
      return next(err);
    }
    console.log(id);
    const data = await Booking.find({ user: id }).populate("Plan");

    res.status(200).json({
      data,
      message: "booking history successfully fetched",
    });
  } catch (error) {
    console.log(error);
  }
};

/*=======================Conversation=====================*/
exports.postConversation = async (req, res) => {
  try {
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });

    const savedConversation = await newConversation.save();
    res.status(200).json({
      savedConversation,
      message: "Data is posted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getConversation = async (req, res, next) => {
  try {
    console.log("hello");
    console.log(req.params.uid);
    if (!req.params.uid) {
      const err = new Error("user id is null");
      err.status = 404;
      return next(err);
    }
    console.log("heAKNSKASDKAJSkD");
    const conversation = await Conversation.find({
      members: { $in: [req.params.uid] },
    });
    res.status(200).json({
      conversation,
      message: "Data fetched Successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
};

/*==================Messages=======================*/

exports.postMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();
    res.status(200).json({
      savedMessage,
      message: "SuccessFully Saved Message",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getMessage = async (req, res) => {
  try {
    console.log("conv id is ");
    console.log(req.params.conversationId);
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json({
      messages,
      message: "Messages find Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
