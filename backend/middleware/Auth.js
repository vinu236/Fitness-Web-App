const User=require("../model/UserSignup")
const jwt=require('jsonwebtoken')

 const generateAccessToken=(user)=>{
    return jwt.sign(
        {id:user.id,isAdmin:user.isAdmin},
        "thisismyssceretkey",
        {expiresIn:"3000s"}
    );
 }

 console.log(generateAccessToken)

 const verifyToken=(req,res,next)=>{
    const authHeader=req.headers.authorization;

    console.log(authHeader);
    //if the token is undefined send response as You are not authenticated
        if(!authHeader){
            return res.status(401).json("You are not Authenticated");
        }
        //! why i use split because i  want to only check token code and not the name of the token
        const token=authHeader.split(" ")[1];
 
        // ! verifying token 
            jwt.verify(token,"thisismyssceretkey",async(err,user)=>{
      
            if(err){ 
                const err=new Error("You are not Authorized");
                err.status=401;
                return next(err)
            }
            req.user=user;
            console.log(req.user);
            //!it will go the next middleware
        
       

        const checkUser=await User.findById(req.user.id);

        if(!checkUser.isActive){
            console.log("hello block")
            const err=new Error("User is Blocked By the Admin")
            err.status=403;
            return next(err);

        }

        next();
    });
 }


module.exports={generateAccessToken,verifyToken}


