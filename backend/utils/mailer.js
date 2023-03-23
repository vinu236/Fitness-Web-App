//! importing nodemailer for send email
const nodemailer=require('nodemailer');
require('dotenv').config();

//! function to send an email with password;

const sendEmail=async(email,password)=>{
    console.log(email)
    //! transporter object=> object used to send mail
    const transporter=nodemailer.createTransport({
        // specifies the email service provider
        service:'gmail',
        auth:{
            user:'nodemon619@gmail.com',
            pass:'ydrfhumyfjlygvge',
        }
    })

    console.log(email)

    const mailoptions = {
        from: "myemail@gmail.com",
        to: email,
        subject: "Your new password",
        text: `Your password is ${password}. Please use it to login to your account later you can change.`,
      };
console.log(mailoptions)

// sends the email using the transporter object and the mailOptions object we created earlier
 try {
  const info= await transporter.sendMail(mailoptions)
    console.log(`Email sent successfully to ${email} `)
 } catch (error) {
    console.log(error)
 }
}

module.exports=sendEmail;