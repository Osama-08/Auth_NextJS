import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bycrypt from 'bcryptjs';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendEmail = async (email,emailType,userId:any) => {
  try {
    const HasedToken=await bycrypt.hash(userId.toString(),10)
    if (emailType === 'verify') {
       await User.findByIdAndUpdate(userId,
         {verifyToken: HasedToken, verifyTokenExpiry: Date.now() + 3600000 } // 1 hour expiry 
          );

    }else if (emailType === 'reset') {
      await User.findByIdAndUpdate(userId,
        {forgotPasswordToken: HasedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 } // 1 hour expiry
         );
    }
  
  // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "79a26575138271",
    pass: "d84c19dd5539fc"
  }});

    const mailOptions = {
       from :"abbasiusama583@gmail.com",
       to: email,
       subject: emailType === 'verify' ? 'Verify Your Email' : 'Reset Your Password',
       html: `
       <p>${emailType === 'verify' ? 'Please verify your email by clicking the link below:' : 'Click the link below to reset your password:'}</p>
       ${process.env.DOMAIN}/verifyEmail/${emailType}/${HasedToken}
        `
    }
    const mailResponse = await transport.sendMail(mailOptions);
    console.log('Email sent successfully:', mailResponse);
    return { success: true, message: 'Email sent successfully' };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}catch (error:any) {
    console.error('Error creating transporter:', error);
    throw new Error('Failed to create email transporter');
  }


}  


