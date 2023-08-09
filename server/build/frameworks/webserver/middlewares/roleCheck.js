"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoleCheckMiddleware = exports.agentRoleCheckMiddleware = exports.userRoleCheckMiddleware = void 0;
const appError_1 = __importDefault(require("../../../utils/appError"));
const httpStatus_1 = require("../../../types/httpStatus");
const userRoleCheckMiddleware = (req, res, next) => {
    var _a;
    const role = (_a = req.payload) === null || _a === void 0 ? void 0 : _a.role;
    if (role === "user") {
        next();
    }
    else {
        throw new appError_1.default("Unauthorized role", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
};
exports.userRoleCheckMiddleware = userRoleCheckMiddleware;
const agentRoleCheckMiddleware = (req, res, next) => {
    var _a;
    const role = (_a = req.payload) === null || _a === void 0 ? void 0 : _a.role;
    if (role === "agent") {
        next();
    }
    else {
        throw new appError_1.default("Unauthorized role", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
};
exports.agentRoleCheckMiddleware = agentRoleCheckMiddleware;
const adminRoleCheckMiddleware = (req, res, next) => {
    var _a;
    const role = (_a = req.payload) === null || _a === void 0 ? void 0 : _a.role;
    if (role === "admin") {
        next();
    }
    else {
        throw new appError_1.default("Unauthorized role", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
};
exports.adminRoleCheckMiddleware = adminRoleCheckMiddleware;
