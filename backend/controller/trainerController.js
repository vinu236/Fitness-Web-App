const Trainer = require("../model/addTrainer");
const bcrypt = require("bcrypt");
const jwtToken = require("../middleware/Auth");
const Booking = require("../model/Booking");

exports.postLogin = async (req, res, next) => {
  try {
    //get values from req.body
    const { email, password } = req.body;
    //check user is exists or not in the Trainer DB
    const userCredentialsCheck = await Trainer.findOne({ email });

    //if user is not Exists throw an error
    if (
      !userCredentialsCheck ||
      !(await bcrypt.compare(password, userCredentialsCheck.password))
    ) {
      const err = new Error("Invalid User! or Password");
      err.status = 404;
      return next(err);
    }

    //! check the user is blocked or not;
    const userActiveCheck = await Trainer.findOne({ email });
    /*  if (!userActiveCheck.isActive) {
      const err = new Error("You are blocked by Admin");
      err.status = 403;
      return next(err);
    } */
    if (!userActiveCheck.isActive) {
      //res('User is Blocked')
      return res.json({
        isBlocked: userActiveCheck.isActive,
        message: "User is Blocked",
      });
    }

    //!GenerateToken
    const accessToken = jwtToken.generateAccessToken(userCredentialsCheck);

    res.status(200).json({
      tid: userCredentialsCheck._id,
      email: userCredentialsCheck.email,
      trainerToken: accessToken,
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.getTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const trainerData = await Trainer.findById(id);
    if (!trainerData) {
      const err = new Error("User is not Found");
      err.status = 404;
    }
    res.status(200).json({
      trainerData,
      message: "data is Found",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.assignedTrainees = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Booking.find({ trainer: id }).populate("Plan")
    .populate({
      path: "user",
      select: "userName email plan",
    })
    if (!data) {
      const err = new Error("data is not Found");
      err.status = 404;
      return next(err);
    }
    res.status(200).json({
      data,
      message: "data is successfully fetched",
    });
  } catch (error) {
    console.log(error);
  }
};
