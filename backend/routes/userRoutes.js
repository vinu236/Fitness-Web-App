// ! importing Dependencies
const express = require("express");
const verify=require("../middleware/Auth")
const router = express.Router();
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

router.get("/login", userControllerRoutes.getLogin);
router.post("/login", userControllerRoutes.postLogin);
router.get('/user/:id',userControllerRoutes.getUser);
router.patch('/update/password/:id',userControllerRoutes.updatePassword);

module.exports = router;
