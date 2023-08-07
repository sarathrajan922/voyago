
import { SendEmailService } from "../../frameworks/services/sentMailService";


export const  sentEmailServiceInterface = (
    service: ReturnType<SendEmailService>
)=>{
    const sentEmail = (email:string)=>{
        service.sendEmail(email);
    }

    const verifyOTP = (OTP:string)=>{
        const response = service.verifyOTP(OTP)
        return response
    }

    return {
        sentEmail,verifyOTP
    }
}

export type SendEmailServiceInterface = typeof sentEmailServiceInterface;