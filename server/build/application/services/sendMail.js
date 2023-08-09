"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sentEmailServiceInterface = void 0;
const sentEmailServiceInterface = (service) => {
    const sentEmail = (email) => {
        service.sendEmail(email);
    };
    const verifyOTP = (OTP) => {
        const response = service.verifyOTP(OTP);
        return response;
    };
    return {
        sentEmail, verifyOTP
    };
};
exports.sentEmailServiceInterface = sentEmailServiceInterface;
