"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminRevenueUseCase = exports.getAllBookingStatUseCase = exports.getAgentsStatusUseCase = exports.BasicDetailsUserAgentPackageBookingUseCase = exports.adminVerifyAgentUseCase = exports.adminGetUnverifiedAgentsUseCase = exports.adminBlockAgentUseCase = exports.adminBlockUserUseCase = exports.adminGetAllAgentsUseCase = exports.adminGetAllUsersUseCase = exports.adminLoginUseCase = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const adminLoginUseCase = (email, password, adminRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const admin = yield adminRepository.getAdminByEmail(email);
    if (!admin) {
        throw new appError_1.default("There is no admin in this email", httpStatus_1.HttpStatus.NOT_FOUND);
    }
    const isPasswordCorrect = yield authService.comparePassword(password, (_a = admin === null || admin === void 0 ? void 0 : admin.password) !== null && _a !== void 0 ? _a : "");
    if (!isPasswordCorrect) {
        throw new appError_1.default("sorry , your password was incorrect.Please double-check your password", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    let id = '';
    if (admin) {
        id = (_c = (_b = admin === null || admin === void 0 ? void 0 : admin._id) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : '';
    }
    const payload = {
        id: id,
        role: 'admin'
    };
    const token = authService.generateToken(payload);
    return token;
});
exports.adminLoginUseCase = adminLoginUseCase;
const adminGetAllUsersUseCase = (adminRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield adminRepository.getAllUsers();
    if (!userData) {
        throw new appError_1.default("No users found", httpStatus_1.HttpStatus.NOT_FOUND);
    }
    return userData;
});
exports.adminGetAllUsersUseCase = adminGetAllUsersUseCase;
const adminGetAllAgentsUseCase = (adminDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const agentData = yield adminDbRepository.getAllAgents();
    if (!agentData) {
        throw new appError_1.default("No agents found", httpStatus_1.HttpStatus.NOT_FOUND);
    }
    return agentData;
});
exports.adminGetAllAgentsUseCase = adminGetAllAgentsUseCase;
const adminBlockUserUseCase = (adminDbRepository, ojbId) => __awaiter(void 0, void 0, void 0, function* () {
    const adminBlockUser = yield adminDbRepository.blockUser(ojbId);
    if (!adminBlockUser) {
        throw new appError_1.default("Operation failed", httpStatus_1.HttpStatus.NOT_MODIFIED);
    }
    return adminBlockUser;
});
exports.adminBlockUserUseCase = adminBlockUserUseCase;
const adminBlockAgentUseCase = (adminDbRepository, ojbId) => __awaiter(void 0, void 0, void 0, function* () {
    const adminBlockAgent = yield adminDbRepository.blockAgent(ojbId);
    if (!adminBlockAgent) {
        throw new appError_1.default("Operation failed", httpStatus_1.HttpStatus.NOT_MODIFIED);
    }
    return adminBlockAgent;
});
exports.adminBlockAgentUseCase = adminBlockAgentUseCase;
const adminGetUnverifiedAgentsUseCase = (adminDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const getAllUnverifiedAgents = yield adminDbRepository.getUnverifiedAgents();
    if (!getAllUnverifiedAgents) {
        throw new appError_1.default("Operation failed", httpStatus_1.HttpStatus.NOT_FOUND);
    }
    return getAllUnverifiedAgents;
});
exports.adminGetUnverifiedAgentsUseCase = adminGetUnverifiedAgentsUseCase;
const adminVerifyAgentUseCase = (adminDbRepository, objId) => __awaiter(void 0, void 0, void 0, function* () {
    const adminVerifyAgent = yield adminDbRepository.verifyAgent(objId);
    if (!adminVerifyAgent) {
        throw new appError_1.default("Operation failed", httpStatus_1.HttpStatus.NOT_MODIFIED);
    }
    return adminVerifyAgent;
});
exports.adminVerifyAgentUseCase = adminVerifyAgentUseCase;
const BasicDetailsUserAgentPackageBookingUseCase = (adminDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield adminDbRepository.BasicDetailsUserAgentPackageBooking();
    if (!result) {
        throw new appError_1.default('could not fetch basic details of user agent package ', httpStatus_1.HttpStatus.NOT_FOUND);
    }
    return result;
});
exports.BasicDetailsUserAgentPackageBookingUseCase = BasicDetailsUserAgentPackageBookingUseCase;
const getAgentsStatusUseCase = (adminDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield adminDbRepository.getAgentStatus();
    if (!result) {
        throw new appError_1.default('could not fetch agents status', httpStatus_1.HttpStatus.NOT_FOUND);
    }
    return result;
});
exports.getAgentsStatusUseCase = getAgentsStatusUseCase;
const getAllBookingStatUseCase = (adminDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield adminDbRepository.getAllBookingStat();
    if (!result) {
        throw new appError_1.default('could not get all booking status', httpStatus_1.HttpStatus.NOT_FOUND);
    }
    return result;
});
exports.getAllBookingStatUseCase = getAllBookingStatUseCase;
const getAdminRevenueUseCase = (adminDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield adminDbRepository.getRevenue();
    if (!result) {
        throw new appError_1.default('could not find revene', httpStatus_1.HttpStatus.NOT_FOUND);
    }
    return result;
});
exports.getAdminRevenueUseCase = getAdminRevenueUseCase;
