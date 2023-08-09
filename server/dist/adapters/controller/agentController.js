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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const agentAuth_1 = require("../../application/useCase/auth/agentAuth");
const agentController = (authServiceInterface, authService, agentDbRepositoryInterface, agentDbRepositoryMongoDb) => {
    const dbRepositoryAgent = agentDbRepositoryInterface(agentDbRepositoryMongoDb());
    const authServices = authServiceInterface(authService());
    const agentRegister = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const agent = req.body;
        if (req.file) {
            agent.idProof_img = req.file.path;
        }
        const { token, agentData } = yield (0, agentAuth_1.agentRegisterUseCase)(agent, dbRepositoryAgent, authServices);
        res.json({
            status: true,
            message: "agent successfully registered",
            token,
            agentData
        });
    }));
    const agentLogin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.body);
        const { email, password } = req.body;
        const { token, agentData } = yield (0, agentAuth_1.agentLoginUseCase)(email, password, dbRepositoryAgent, authServices);
        res.json({
            status: true,
            message: "agent login successful",
            token,
            agentData,
        });
    }));
    const addCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const agentId = (_b = (_a = req === null || req === void 0 ? void 0 : req.payload) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : '';
        req.body.agentId = (_d = (_c = req === null || req === void 0 ? void 0 : req.payload) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : '';
        const category = req.body;
        console.log(category);
        const result = yield (0, agentAuth_1.agentAddCategoryUseCase)(category, dbRepositoryAgent);
        res.json({
            status: true,
            message: "category added successfully",
            result,
        });
    }));
    const getCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _e, _f;
        const agentId = (_f = (_e = req === null || req === void 0 ? void 0 : req.payload) === null || _e === void 0 ? void 0 : _e.id) !== null && _f !== void 0 ? _f : '';
        const result = yield (0, agentAuth_1.getAgentCategoryUseCase)(agentId, dbRepositoryAgent);
        res.json({
            status: true,
            message: "All categories of the requested agent",
            result,
        });
    }));
    const deleteCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = req === null || req === void 0 ? void 0 : req.body;
        const agentId = data === null || data === void 0 ? void 0 : data.agentId;
        const categoryName = data === null || data === void 0 ? void 0 : data.categoryName;
        const result = yield (0, agentAuth_1.deleteCategoryUseCase)(agentId, categoryName, dbRepositoryAgent);
        res.json({
            status: true,
            message: "Category deleted successfully",
            result,
        });
    }));
    const addPackage = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _g, _h, _j, _k;
        const data = req === null || req === void 0 ? void 0 : req.body;
        const agentId = (_h = (_g = req === null || req === void 0 ? void 0 : req.payload) === null || _g === void 0 ? void 0 : _g.id) !== null && _h !== void 0 ? _h : '';
        data.agentId = agentId;
        if (req.file) {
            data.images = req.file.path;
        }
        data.duraction = parseInt((_j = req === null || req === void 0 ? void 0 : req.body) === null || _j === void 0 ? void 0 : _j.duraction);
        data.price = parseInt((_k = req === null || req === void 0 ? void 0 : req.body) === null || _k === void 0 ? void 0 : _k.price);
        const result = yield (0, agentAuth_1.addTourPackageUseCase)(data, dbRepositoryAgent);
        res.json({
            status: true,
            message: "tour package added successfully",
            result,
        });
    }));
    const getAllPackages = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _l, _m;
        const agentId = (_m = (_l = req === null || req === void 0 ? void 0 : req.payload) === null || _l === void 0 ? void 0 : _l.id) !== null && _m !== void 0 ? _m : '';
        const result = yield (0, agentAuth_1.getAllPackageUseCase)(agentId, dbRepositoryAgent);
        res.json({
            status: true,
            message: " All packages successfully fetched",
            result,
        });
    }));
    const getPackage = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _o;
        const packageId = (_o = req === null || req === void 0 ? void 0 : req.params) === null || _o === void 0 ? void 0 : _o.id;
        const result = yield (0, agentAuth_1.getPackageUseCase)(packageId, dbRepositoryAgent);
        res.json({
            status: true,
            message: "Package fetch successful",
            result,
        });
    }));
    const disablePackage = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _p;
        const packageId = (_p = req === null || req === void 0 ? void 0 : req.params) === null || _p === void 0 ? void 0 : _p.id;
        const result = yield (0, agentAuth_1.disablepackageUseCase)(packageId, dbRepositoryAgent);
        res.json({
            status: true,
            message: "Package disable successfully",
            result,
        });
    }));
    const updatePackage = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _q, _r, _s;
        const packageId = (_q = req === null || req === void 0 ? void 0 : req.params) === null || _q === void 0 ? void 0 : _q.id;
        const data = req === null || req === void 0 ? void 0 : req.body;
        if (req.file) {
            data.images = req.file.path;
        }
        data.duraction = parseInt((_r = req === null || req === void 0 ? void 0 : req.body) === null || _r === void 0 ? void 0 : _r.duraction);
        data.price = parseInt((_s = req === null || req === void 0 ? void 0 : req.body) === null || _s === void 0 ? void 0 : _s.price);
        console.log(packageId);
        console.log(data);
        const result = yield (0, agentAuth_1.updatePackageUseCase)(data, packageId, dbRepositoryAgent);
        res.json({
            status: true,
            message: "package updated successfully",
            result,
        });
    }));
    const deletePackage = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _t;
        const packageId = (_t = req === null || req === void 0 ? void 0 : req.params) === null || _t === void 0 ? void 0 : _t.id;
        const result = yield (0, agentAuth_1.deletePackageUseCase)(packageId, dbRepositoryAgent);
        res.json({
            status: true,
            message: "package deleted  successfully",
            result,
        });
    }));
    const agentGetAllBooking = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _u, _v;
        const agentId = (_v = (_u = req === null || req === void 0 ? void 0 : req.payload) === null || _u === void 0 ? void 0 : _u.id) !== null && _v !== void 0 ? _v : '';
        const result = yield (0, agentAuth_1.AgentGetAllBookingsUseCase)(agentId, dbRepositoryAgent);
        res.json({
            status: true,
            message: 'fetching agent booking details successful',
            result
        });
    }));
    const checkAgentVerified = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _w, _x;
        const agentId = (_x = (_w = req === null || req === void 0 ? void 0 : req.payload) === null || _w === void 0 ? void 0 : _w.id) !== null && _x !== void 0 ? _x : '';
        const result = yield (0, agentAuth_1.checkAgentVerificationUseCase)(agentId, dbRepositoryAgent);
        res.json({
            status: true,
            message: 'successfully checked agent verified or not',
            result
        });
    }));
    const getAgentProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _y, _z;
        const agentId = (_z = (_y = req === null || req === void 0 ? void 0 : req.payload) === null || _y === void 0 ? void 0 : _y.id) !== null && _z !== void 0 ? _z : '';
        const result = yield (0, agentAuth_1.getAgentProfileUseCase)(agentId, dbRepositoryAgent);
        res.json({
            status: true,
            message: 'successfully fetched agent profile',
            result
        });
    }));
    const agentProfileUpdate = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _0, _1, _2;
        const agentId = (_1 = (_0 = req === null || req === void 0 ? void 0 : req.payload) === null || _0 === void 0 ? void 0 : _0.id) !== null && _1 !== void 0 ? _1 : '';
        const updatedData = req.body;
        updatedData.mobile = parseInt((_2 = req === null || req === void 0 ? void 0 : req.body) === null || _2 === void 0 ? void 0 : _2.mobile);
        const result = yield (0, agentAuth_1.agentProfileUpdateUseCase)(agentId, updatedData, dbRepositoryAgent, authServices);
        res.json({
            status: true,
            message: 'successfully updated agent details',
            result
        });
    }));
    const paymentAlertMessage = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _3, _4, _5, _6, _7;
        const agentId = (_4 = (_3 = req === null || req === void 0 ? void 0 : req.payload) === null || _3 === void 0 ? void 0 : _3.id) !== null && _4 !== void 0 ? _4 : '';
        const price = (_5 = req === null || req === void 0 ? void 0 : req.body) === null || _5 === void 0 ? void 0 : _5.price.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
        });
        const message = `Your booked Package '` + ((_6 = req === null || req === void 0 ? void 0 : req.body) === null || _6 === void 0 ? void 0 : _6.packageName) + `' amount of  ` + price + ` is still pending`;
        console.log(message);
        const obj = {
            agentId,
            userId: (_7 = req === null || req === void 0 ? void 0 : req.body) === null || _7 === void 0 ? void 0 : _7.userId,
            message
        };
        const result = yield (0, agentAuth_1.paymentAlertUseCase)(obj, dbRepositoryAgent);
        res.json({
            status: true,
            message: 'successfully sent message to the  user',
            result
        });
    }));
    const getAgentBookingStat = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _8, _9;
        const agentId = (_9 = (_8 = req === null || req === void 0 ? void 0 : req.payload) === null || _8 === void 0 ? void 0 : _8.id) !== null && _9 !== void 0 ? _9 : '';
        const result = yield (0, agentAuth_1.getAgentBookingStatUseCase)(agentId, dbRepositoryAgent);
        res.json({
            status: true,
            message: 'successfully get all booking status',
            result
        });
    }));
    const getRevenue = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _10, _11;
        const agentId = (_11 = (_10 = req.payload) === null || _10 === void 0 ? void 0 : _10.id) !== null && _11 !== void 0 ? _11 : '';
        const result = yield (0, agentAuth_1.getAgentRevenueUseCase)(agentId, dbRepositoryAgent);
        res.json({
            status: true,
            message: 'fetch agent revenue successfull',
            result
        });
    }));
    const getUserCountAndBookingCount = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _12, _13;
        const agentId = (_13 = (_12 = req.payload) === null || _12 === void 0 ? void 0 : _12.id) !== null && _13 !== void 0 ? _13 : '';
        const result = yield (0, agentAuth_1.getUserCountAndBookingCountUseCase)(agentId, dbRepositoryAgent);
        res.json({
            status: true,
            message: 'fetch agent booking count and user count',
            result
        });
    }));
    return {
        agentRegister,
        agentLogin,
        addCategory,
        getCategory,
        deleteCategory,
        addPackage,
        getAllPackages,
        getPackage,
        disablePackage,
        updatePackage,
        deletePackage,
        agentGetAllBooking,
        checkAgentVerified,
        getAgentProfile,
        agentProfileUpdate,
        paymentAlertMessage,
        getAgentBookingStat,
        getRevenue,
        getUserCountAndBookingCount
    };
};
exports.default = agentController;
