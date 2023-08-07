import nodemailer, { Transporter } from 'nodemailer';
import configKeys from '../../config';
export const SendMailService = ()=>{
    const transporter:Transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user: configKeys.EMAIL_NODE_MAILER,
            pass: configKeys.PASS_NODE_MAILER
        }
    });

    let otp:string|null;


    const sendEmail= (email:string)=>{
        otp = Math.floor(100000 + Math.random() * 900000).toString();

        const otpData ={
            email,
            otp
        };
        console.log(otpData)
        setTimeout(()=>{
            otp = null
          },120000)


          const mailOptions = {
            from:'sarathrajan922@gmail.com',
            to: email,
            subject: 'OTP for Login',
            text: `Your OTP for login is: ${otp}`,
          };
          transporter.sendMail(mailOptions,(error,info)=>{
            if (error) {
                console.error('Error sending email:', error);
              } else {
                console.log('Email sent:', info.response);
              }
          });
      
    };

    const verifyOTP = (OTP:string)=>{
        if(OTP == otp){
            return {message:`OTP verified`}
        }else if(otp == null){
            return{message:'OTP is expired'}
          }else{
            return {message:'OTP is invalid'}
          }
    }

    return {
        sendEmail,verifyOTP
      };
}


export type SendEmailService = typeof SendMailService;