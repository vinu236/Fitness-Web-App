const crypto=require("crypto");

//!function to generate a random password;

const generatePassword=()=>{
    return crypto.randomBytes(7).toString('hex');
};
module.exports=generatePassword;