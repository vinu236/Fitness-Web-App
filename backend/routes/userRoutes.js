// ! importing Dependencies
const express = require("express");
const verify=require("../middleware/Auth")
const router = express.Router();
const multer=require("multer");
const {storage}=require("../cloudinary")
const upload=multer({storage})
// !importing Controller(Business Logics)
const userControllerRoutes = require("../controller/userController");


router.get("/signup", userControllerRoutes.getSignUp);

router.post("/signup", userControllerRoutes.postSignup);
router.delete("/testing/:id",verify.verifyToken,(req,res)=>{

    if(!req.user.isAdmin){
        return res.json("The user has been deleted");
    }
    res.status(200).json(" sorry You are not Authenticated to delete the user")
})
//Login=>
router.get("/login", userControllerRoutes.getLogin);
router.post("/login", userControllerRoutes.postLogin);
router.get('/user/:id',verify.verifyToken,userControllerRoutes.getUser);
router.patch('/update/password/:id',verify.verifyToken,userControllerRoutes.updatePassword);
console.log("hello")
router.patch('/update/img/:id',verify.verifyToken,upload.single('img'),userControllerRoutes.updateProImg)

// Bmi=>
router.patch("/add/bmi/:id",userControllerRoutes.addBmi);


//Booking=>
// router.get("/bookings/:id",userControllerRoutes.getBooking);
router.post("/plan/booking",verify.verifyToken,userControllerRoutes.addBooking);
router.get("/booking/:id",userControllerRoutes.userBookingHistory)



//Conversations
router.post("/conversation",userControllerRoutes.postConversation);
router.get('/conversation/:uid',userControllerRoutes.getConversation);

//addMessage
router.post("/message",userControllerRoutes.postMessage);
router.get("/message/:conversationId",userControllerRoutes.getMessage);


//otp
router.post("/verify/otp",userControllerRoutes.postVerifyOtp);

router.get("/user/active/count/",userControllerRoutes.getActiveCount);
router.get("/user/deActive/count/",userControllerRoutes.getDeActiveCount);
module.exports = router;
