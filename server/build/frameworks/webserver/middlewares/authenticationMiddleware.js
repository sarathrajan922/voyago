"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authService_1 = require("../../services/authService");
const appError_1 = __importDefault(require("../../../utils/appError"));
const httpStatus_1 = require("../../../types/httpStatus");
const authenticationMiddleware = (req, res, next) => {
    let token = "";
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        throw new appError_1.default("Token not found", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    try {
        const payload = (0, authService_1.authService)().verifyToken(token);
        req.payload = payload;
        next();
    }
    catch (error) {
        throw new appError_1.default("UnAuthorized user", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
};
exports.default = authenticationMiddleware;
