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
    //if the token is undefined send response as You are not authenticated
        if(!authHeader){
            return res.status(401).json("You are not Authenticated");
        }
        //! why i use split because i  want to only check token code and not the name of the token
        const token=authHeader.split(" ")[1];
        console.log(token)
        // ! verifying token 
        jwt.verify(token,"thisismyssceretkey",(err,user)=>{
            if(err){
                return res.status(403).json("Token is not valid");
            }
            req.user=user;
            console.log(req.user)
            //!it will go the next middleware
            next();
        })
 }


module.exports={generateAccessToken,verifyToken}


