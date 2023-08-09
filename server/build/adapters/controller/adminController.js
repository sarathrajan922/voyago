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
const adminAuth_1 = require("../../application/useCase/auth/adminAuth");
const adminAuth_2 = require("../../application/useCase/auth/adminAuth");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const adminController = (authServiceInterface, authService, adminDbRepositoryInterface, adminDbRepositoryMongoDb) => {
    const dbRepositoryAdmin = adminDbRepositoryInterface(adminDbRepositoryMongoDb());
    const authServices = authServiceInterface(authService());
    const adminLogin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.body);
        const { email, password } = req.body;
        const admin = req.body;
        const token = yield (0, adminAuth_1.adminLoginUseCase)(email, password, dbRepositoryAdmin, authServices);
        res.json({
            status: true,
            message: 'admin login successful',
            token
        });
    }));
    const adminGetAllUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userData = yield (0, adminAuth_2.adminGetAllUsersUseCase)(dbRepositoryAdmin);
        res.json({
            status: 'success',
            userData
        });
    }));
    const adminGetAllAgents = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const agentData = yield (0, adminAuth_1.adminGetAllAgentsUseCase)(dbRepositoryAdmin);
        res.json({
            status: 'success',
            agentData
        });
    }));
    const adminBlockUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.params.id;
        const result = yield (0, adminAuth_1.adminBlockUserUseCase)(dbRepositoryAdmin, userId);
        res.json({
            status: 'success',
            result
        });
    }));
    const adminBlockAgent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const agentId = req.params.id;
        const result = yield (0, adminAuth_1.adminBlockAgentUseCase)(dbRepositoryAdmin, agentId);
        res.json({
            status: 'success',
            result
        });
    }));
    const getUnverifiedAgents = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, adminAuth_1.adminGetUnverifiedAgentsUseCase)(dbRepositoryAdmin);
        res.json({
            status: 'success',
            result
        });
    }));
    const verifyAgent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const agentId = req.params.id;
        const result = yield (0, adminAuth_1.adminVerifyAgentUseCase)(dbRepositoryAdmin, agentId);
        res.json({
            status: 'success',
            result
        });
    }));
    const BasicDetailsUserAgentPackageBooking = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, adminAuth_1.BasicDetailsUserAgentPackageBookingUseCase)(dbRepositoryAdmin);
        res.json({
            status: 'success',
            result
        });
    }));
    const getAgentsStatus = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, adminAuth_1.getAgentsStatusUseCase)(dbRepositoryAdmin);
        res.json({
            status: true,
            message: 'fetch agents status successfully',
            result
        });
    }));
    const getAllBookingStat = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, adminAuth_1.getAllBookingStatUseCase)(dbRepositoryAdmin);
        res.json({
            status: true,
            message: 'fetch all booking statuses successfully',
            result
        });
    }));
    const getRevenue = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, adminAuth_1.getAdminRevenueUseCase)(dbRepositoryAdmin);
        res.json({
            status: true,
            message: 'fetch admin revenue successfull',
            result
        });
    }));
    return {
        adminLogin,
        adminGetAllUsers,
        adminGetAllAgents,
        adminBlockUser,
        adminBlockAgent,
        getUnverifiedAgents,
        verifyAgent,
        BasicDetailsUserAgentPackageBooking,
        getAgentsStatus,
        getAllBookingStat,
        getRevenue
    };
};
exports.default = adminController;
