const jwt=require('jsonwebtoken')
 const generateAccessToken=(user)=>{
    return jwt.sign(
        {id:user.id,isAdmin:user.isAdmin},
        "thisismyssceretkey",
        {expiresIn:"3000s"}
    );
 }


 const verifyToken=(req,res,next)=>{
    const authHeader=req.headers.authorization;

    console.log(authHeader)
        if(!authHeader){
            return res.status(401).json("You are not Authenticated");
        }

        const token=authHeader.split(" ")[1];
        console.log(token)
        // ! verifying token 
        jwt.verify(token,"thisismyssceretkey",(err,user)=>{
            if(err){
                return res.status(403).json("Token is not valid");
            }
            console.log(user)
            req.user=user;
            console.log("asfda")
            console.log(req.user)
            next();
        })
 }


module.exports={generateAccessToken,verifyToken}


