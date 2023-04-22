// ! importing Dependencies
const express = require("express");
const verify=require("../middleware/Auth")
const router = express.Router();
const multer=require("multer");
// const upload=multer({dest:})
// !importing Controller(Business Logics)
const userControllerRoutes = require("../controller/userController");


router.get("/signup", userControllerRoutes.getSignUp);

router.post("/signup", userControllerRoutes.postSignup);
router.delete("/testing/:id",verify.verifyToken,(req,res)=>{

    if(!req.user.isAdmin){
        res.json("The user has been deleted");
    }
    res.status(200).json(" sorry You are not Authenticated to delete the user")
})
//Login=>
router.get("/login", userControllerRoutes.getLogin);
router.post("/login", userControllerRoutes.postLogin);
router.get('/user/:id',userControllerRoutes.getUser);
router.patch('/update/password/:id',userControllerRoutes.updatePassword);

// Bmi=>
router.patch("/add/bmi/:id",userControllerRoutes.addBmi);


//Booking=>
// router.get("/bookings/:id",userControllerRoutes.getBooking);
router.post("/plan/booking",userControllerRoutes.addBooking);
router.get("/booking/:id",userControllerRoutes.userBookingHistory)



//Conversations
router.post("/conversation",userControllerRoutes.postConversation);
router.get('/conversation/:uid',userControllerRoutes.getConversation);

//addMessage
router.post("/message",userControllerRoutes.postMessage);
router.get("/message/:conversationId",userControllerRoutes.getMessage);


//otp
router.post("/verify/otp",userControllerRoutes.postVerifyOtp)
module.exports = router;
