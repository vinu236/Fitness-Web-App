const User = require("../model/UserSignup");
const jwtToken = require("../middleware/Auth");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.getSignUp = (req, res) => {
  res.status(200).json("Welcome to Signup Page");
};

exports.postSignup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);

    const userCheck = await User.findOne({ email: email });
    if (userCheck) {
      console.log("adhakdhka")
      const err=new Error("User already Exist");
      err.status=409
      return next(err)
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const data = await User.create({
      userName: username, 
      email: email,
      password: hashPassword,
    });
    
    
    return res.status(201).json(data);
  } catch (err) {
    next(err)
  }
};

exports.getLogin = (req, res) => {
  res.status(200).json("Welcome to home Page");
};

exports.postLogin = async (req, res,next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const userCheck = await User.findOne({ email });
    console.log(userCheck)
    

    //!early return
    if (!userCheck) {
      res.status(401);
      throw new Error("User credentials are not valid");
    }
  
    
    // retrieve the hashed password from the database
    const hashPassword = userCheck.password;
   
    const passwordMatch = await bcrypt.compare(password, hashPassword);
    
    if (!passwordMatch) {
      const err= new Error("Wrong Password");
      err.status=401;
      return next(err);
    }
   
    const userActiveCheck = await User.findOne({ email: email });
    console.log(userActiveCheck);
     if(!userActiveCheck.isActive){
        // throw new Error('User is Blocked')
       return res.json({
        isBlocked:userActiveCheck.isActive,
          message:"User is Blocked"
        })
     }
    //! Generate token
    const accessToken = jwtToken.generateAccessToken(userCheck);
    res.status(200).json({
      uid: userCheck._id,
      email: userCheck.email,
      isAdmin: userCheck.isAdmin,
      traineeToken: accessToken,
    });
  } catch (error) {
  //  next(error);
  throw new Error(error)
  }
};

exports.getUser = async (req, res) => {
  try {
    //! destructing the id params;
    const { id } = req.params;

    //! Convert the id parameter to a valid ObjectId
    const uId = mongoose.Types.ObjectId(id);

    //! find the  user id from the User collection and project the data that i want (second argument)
    const getUser = await User.findById(uId, { userName: 1, email: 1 });

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
      console.log("testing")
    //! if password is not match throw error
    if (!passwordMatch) {
      throw new Error("User Password is not match");
    }
    //! after successfully compare the password the then i hashing the password
    const hashPassword = await bcrypt.hash(newPassword, 10);

    //!after hashing the password im updating my hashed password in the with corresponding user id
    const updatePassword = await User.findByIdAndUpdate(
      uid ,
      { password: hashPassword }
    );

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
};

