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
const userAuth_1 = require("../../application/useCase/auth/userAuth");
const userAuth_2 = require("../../application/useCase/auth/userAuth");
const authController = (authServiceInterface, authService, googelAuthServiceInterface, googleAuthService, userDbRepositoryInterface, userDbRepositoryMongoDb, emailServiceInterface, emailServiceImpl) => {
    const dbRepositoryUser = userDbRepositoryInterface(userDbRepositoryMongoDb());
    const authServices = authServiceInterface(authService());
    const googleAuthServices = googelAuthServiceInterface(googleAuthService());
    const emailService = emailServiceInterface(emailServiceImpl());
    const userRegister = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.body;
        const { token, userData } = yield (0, userAuth_1.userRegisterUseCase)(user, dbRepositoryUser, authServices);
        res.json({
            status: true,
            message: "user registered successfully",
            token,
            userData,
        });
    }));
    const userLogin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        // const user: UserInterface = req.body;
        const { token, user } = yield (0, userAuth_1.userLoginUserCase)(email, password, dbRepositoryUser, authServices);
        res.json({
            status: true,
            message: "user login successful",
            user,
            token,
        });
    }));
    const getAllPackage = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, userAuth_1.userGetAllPackageUseCase)(dbRepositoryUser);
        res.json({
            status: true,
            message: "fetching all package success",
            result,
        });
    }));
    const getPackage = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const packageId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
        const result = yield (0, userAuth_2.getPackageUseCase)(packageId, dbRepositoryUser);
        res.json({
            status: true,
            message: "fetching package success",
            result,
        });
    }));
    const bookPackage = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _b, _c;
        const userId = (_c = (_b = req.payload) === null || _b === void 0 ? void 0 : _b.id) !== null && _c !== void 0 ? _c : "";
        req.body.userId = userId;
        const bookingDetails = req === null || req === void 0 ? void 0 : req.body;
        const result = yield (0, userAuth_1.userPackageBookingUseCase)(bookingDetails, dbRepositoryUser);
        res.json({
            status: true,
            message: "Tour Package booked successfully",
            result,
        });
    }));
    const loginWithGoogle = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.body);
        const { credential } = req.body;
        const { token, user, userData } = yield (0, userAuth_1.signInWithGoogle)(credential, googleAuthServices, dbRepositoryUser, authServices);
        res.status(200).json({
            status: "success",
            message: "Successfully logged in with google",
            token,
            user,
            userData,
        });
    }));
    const getUserDetails = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _d, _e;
        const userId = (_e = (_d = req.payload) === null || _d === void 0 ? void 0 : _d.id) !== null && _e !== void 0 ? _e : "";
        const userData = yield (0, userAuth_1.getUserDetailsUseCase)(userId, dbRepositoryUser);
        res.json({
            status: "success",
            message: "successfully fetched user details",
            userData,
        });
    }));
    const userUpdateProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _f, _g, _h;
        const userId = (_g = (_f = req.payload) === null || _f === void 0 ? void 0 : _f.id) !== null && _g !== void 0 ? _g : "";
        const updatedData = req.body;
        updatedData.mobile = parseInt((_h = req === null || req === void 0 ? void 0 : req.body) === null || _h === void 0 ? void 0 : _h.mobile);
        const result = yield (0, userAuth_1.updateUserProfileUseCase)(userId, updatedData, dbRepositoryUser, authServices);
        res.json({
            status: true,
            message: "user profile updated successfully",
            result,
        });
    }));
    const userUpdatePassword = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _j, _k;
        const userId = (_k = (_j = req === null || req === void 0 ? void 0 : req.payload) === null || _j === void 0 ? void 0 : _j.id) !== null && _k !== void 0 ? _k : '';
        const editedPassword = req.body;
        const result = yield (0, userAuth_1.userPasswordUpdateUseCase)(userId, editedPassword, dbRepositoryUser, authServices);
        res.json({
            status: true,
            message: 'user password change successfuly',
            result
        });
    }));
    const updatePasswordWithEmail = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _l, _m, _o, _p;
        const email = (_m = (_l = req.body) === null || _l === void 0 ? void 0 : _l.email) !== null && _m !== void 0 ? _m : '';
        const obj = {
            newPassword: (_p = (_o = req.body) === null || _o === void 0 ? void 0 : _o.password) !== null && _p !== void 0 ? _p : ''
        };
        const result = yield (0, userAuth_1.updatePasswordWithEmailUseCase)(email, obj, dbRepositoryUser, authServices);
        res.json({
            status: true,
            message: 'user password update successful',
            result
        });
    }));
    const getUserBookedDetails = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _q, _r;
        const userId = (_r = (_q = req.payload) === null || _q === void 0 ? void 0 : _q.id) !== null && _r !== void 0 ? _r : "";
        const packageId = req.params.id;
        const result = yield (0, userAuth_1.getUserBookedDetailsUseCase)(userId, packageId, dbRepositoryUser);
        res.json({
            status: true,
            message: "user booked data fetched successfully",
            result,
        });
    }));
    const getAllBookings = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _s, _t;
        const userId = (_t = (_s = req.payload) === null || _s === void 0 ? void 0 : _s.id) !== null && _t !== void 0 ? _t : "";
        const result = yield (0, userAuth_1.getAllBookingsUseCase)(userId, dbRepositoryUser);
        res.json({
            status: true,
            message: "user booked details fetched successfully",
            result,
        });
    }));
    const paymentStatusChange = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { tourId } = req.body;
        const result = yield (0, userAuth_1.paymentStatusChangeUseCase)(tourId, dbRepositoryUser);
        res.json({
            status: true,
            message: "user payment status changed successfully",
            result,
        });
    }));
    const getAlertMsg = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _u, _v;
        const userId = (_v = (_u = req === null || req === void 0 ? void 0 : req.payload) === null || _u === void 0 ? void 0 : _u.id) !== null && _v !== void 0 ? _v : "";
        const result = yield (0, userAuth_1.getAlertMsgUseCase)(userId, dbRepositoryUser);
        res.json({
            status: true,
            message: "Alert message fetched successfully",
            result,
        });
    }));
    const createCommnuity = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _w, _x;
        const userId = (_x = (_w = req === null || req === void 0 ? void 0 : req.payload) === null || _w === void 0 ? void 0 : _w.id) !== null && _x !== void 0 ? _x : "";
        const { communityName } = req.body;
        const obj = {
            communityName,
            admin: userId,
        };
        const result = yield (0, userAuth_1.createCommunityUseCase)(obj, dbRepositoryUser);
        res.json({
            status: true,
            message: "community create Success",
            result,
        });
    }));
    const getAllCommunity = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _y, _z;
        const userId = (_z = (_y = req === null || req === void 0 ? void 0 : req.payload) === null || _y === void 0 ? void 0 : _y.id) !== null && _z !== void 0 ? _z : '';
        const result = yield (0, userAuth_1.getAllCommunityUseCase)(dbRepositoryUser);
        res.json({
            status: true,
            message: "fetch all communities success",
            result,
            userId
        });
    }));
    const joinCommunity = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _0, _1;
        const userId = (_1 = (_0 = req === null || req === void 0 ? void 0 : req.payload) === null || _0 === void 0 ? void 0 : _0.id) !== null && _1 !== void 0 ? _1 : '';
        const { communityId } = req === null || req === void 0 ? void 0 : req.body;
        const obj = {
            userId,
            communityId
        };
        const result = yield (0, userAuth_1.joinCommunityUseCase)(obj, dbRepositoryUser);
        res.json({
            status: true,
            message: 'user joined successfully',
            result
        });
    }));
    const getAllJoinedAndNotJoinedCommunity = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _2, _3;
        const userId = (_3 = (_2 = req === null || req === void 0 ? void 0 : req.payload) === null || _2 === void 0 ? void 0 : _2.id) !== null && _3 !== void 0 ? _3 : '';
        const result = yield (0, userAuth_1.getAllJoinedAndNotJoinedCommunityUseCase)(userId, dbRepositoryUser);
        res.json({
            status: true,
            message: 'fetch all user joined and not joined communities success',
            result,
            userId
        });
    }));
    const createConversation = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _4, _5;
        const userId = (_5 = (_4 = req === null || req === void 0 ? void 0 : req.payload) === null || _4 === void 0 ? void 0 : _4.id) !== null && _5 !== void 0 ? _5 : '';
        let conversationObj = req === null || req === void 0 ? void 0 : req.body;
        conversationObj.senderId = userId;
        const result = yield (0, userAuth_1.createConversationUseCase)(conversationObj, dbRepositoryUser);
        res.json({
            status: true,
            message: 'conversation created successfully',
            result,
        });
    }));
    const getAllConversation = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _6;
        const communityId = (_6 = req === null || req === void 0 ? void 0 : req.params) === null || _6 === void 0 ? void 0 : _6.id;
        const result = yield (0, userAuth_1.getAllConversationUseCase)(communityId, dbRepositoryUser);
        res.json({
            status: true,
            message: 'fetch all conversation data successful',
            result
        });
    }));
    const getAllUniqueCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, userAuth_1.getAllUniqueCategoryUseCase)(dbRepositoryUser);
        res.json({
            status: true,
            message: 'fetch all unique category data successful',
            result
        });
    }));
    const generateOTPtoEmail = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _7, _8;
        const userEmail = (_8 = (_7 = req.body) === null || _7 === void 0 ? void 0 : _7.email) !== null && _8 !== void 0 ? _8 : '';
        const result = yield (0, userAuth_1.generateOTPUseCase)(userEmail, dbRepositoryUser, emailService);
        res.json({
            status: true,
            message: 'OTP sent to your Email success!',
            result
        });
    }));
    const verifyOTP = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _9, _10;
        const userOTP = (_10 = (_9 = req.body) === null || _9 === void 0 ? void 0 : _9.otp) !== null && _10 !== void 0 ? _10 : '';
        const result = yield (0, userAuth_1.verifiyOTPUseCase)(userOTP.toString(), emailService);
        res.json({
            status: true,
            message: 'OTP verification done!',
            result
        });
    }));
    return {
        userRegister,
        userLogin,
        getAllPackage,
        getPackage,
        bookPackage,
        loginWithGoogle,
        getUserDetails,
        userUpdateProfile,
        userUpdatePassword,
        getUserBookedDetails,
        getAllBookings,
        paymentStatusChange,
        getAlertMsg,
        createCommnuity,
        getAllCommunity,
        joinCommunity,
        getAllJoinedAndNotJoinedCommunity,
        createConversation,
        getAllConversation,
        getAllUniqueCategory,
        generateOTPtoEmail,
        verifyOTP,
        updatePasswordWithEmail
    };
};
exports.default = authController;
