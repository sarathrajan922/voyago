"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../../config"));
const SendMailService = () => {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: config_1.default.EMAIL_NODE_MAILER,
            pass: config_1.default.PASS_NODE_MAILER
        }
    });
    let otp;
    const sendEmail = (email) => {
        otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpData = {
            email,
            otp
        };
        console.log(otpData);
        setTimeout(() => {
            otp = null;
        }, 120000);
        const mailOptions = {
            from: 'sarathrajan922@gmail.com',
            to: email,
            subject: 'OTP for Login',
            text: `Your OTP for login is: ${otp}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            }
            else {
                console.log('Email sent:', info.response);
            }
        });
    };
    const verifyOTP = (OTP) => {
        if (OTP == otp) {
            return { message: `OTP verified` };
        }
        else if (otp == null) {
            return { message: 'OTP is expired' };
        }
        else {
            return { message: 'OTP is invalid' };
        }
    };
    return {
        sendEmail, verifyOTP
    };
};
exports.SendMailService = SendMailService;
