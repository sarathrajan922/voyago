"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServiceInterface = void 0;
const authServiceInterface = (service) => {
    const hashPassword = (password) => service.hashPassword(password);
    const comparePassword = (password, hashedPassword) => service.comparePassword(password, hashedPassword);
    const verifyPassword = (token) => service.verifyToken(token);
    const generateToken = (payload) => service.generateToken(payload);
    return {
        hashPassword,
        comparePassword,
        verifyPassword,
        generateToken,
    };
};
exports.authServiceInterface = authServiceInterface;
