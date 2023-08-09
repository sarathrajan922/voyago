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
exports.verifiyOTPUseCase = exports.generateOTPUseCase = exports.getAllUniqueCategoryUseCase = exports.getAllConversationUseCase = exports.createConversationUseCase = exports.getAllJoinedAndNotJoinedCommunityUseCase = exports.joinCommunityUseCase = exports.getAllCommunityUseCase = exports.createCommunityUseCase = exports.getAlertMsgUseCase = exports.paymentStatusChangeUseCase = exports.getAllBookingsUseCase = exports.getUserBookedDetailsUseCase = exports.updatePasswordWithEmailUseCase = exports.userPasswordUpdateUseCase = exports.updateUserProfileUseCase = exports.getUserDetailsUseCase = exports.signInWithGoogle = exports.getPackageUseCase = exports.userPackageBookingUseCase = exports.userGetAllPackageUseCase = exports.userLoginUserCase = exports.userRegisterUseCase = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const userRegisterUseCase = (user, userRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    user.email = user.email.toLowerCase();
    const isExistingEmail = yield userRepository.getUserByEmail(user.email);
    if (isExistingEmail) {
        throw new appError_1.default("existing email", httpStatus_1.HttpStatus.CONFLICT);
    }
    if (user.password) {
        user.password = yield authService.hashPassword(user.password);
    }
    const userData = yield userRepository.addUser(user);
    // const { _id: userId } = await userRepository.addUser(user);
    const payload = {
        id: userData === null || userData === void 0 ? void 0 : userData._id.toString(),
        role: "user",
    };
    const token = authService.generateToken(payload);
    return {
        token,
        userData,
    };
});
exports.userRegisterUseCase = userRegisterUseCase;
const userLoginUserCase = (email, password, userRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const user = yield userRepository.getUserByEmail(email);
    if (!user) {
        throw new appError_1.default("this user doesn't exist", httpStatus_1.HttpStatus.NOT_FOUND);
    }
    const isPasswordCorrect = yield authService.comparePassword(password, (_a = user === null || user === void 0 ? void 0 : user.password) !== null && _a !== void 0 ? _a : "");
    if (!isPasswordCorrect) {
        throw new appError_1.default("sorry, your password was incorrect.Please double-check your password", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const isUserBlock = yield userRepository.checkUserBlock(email);
    if (!isUserBlock) {
        throw new appError_1.default("user is blocked by admin", httpStatus_1.HttpStatus.NOT_ACCEPTABLE);
    }
    let id = "";
    if (user) {
        id = (_c = (_b = user === null || user === void 0 ? void 0 : user._id) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : "";
    }
    const payload = {
        id: id,
        role: "user",
    };
    const token = authService.generateToken(payload);
    return {
        token,
        user,
    };
});
exports.userLoginUserCase = userLoginUserCase;
const userGetAllPackageUseCase = (userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const getAllPackage = yield userRepository.getAllPackage();
    if (!getAllPackage) {
        throw new appError_1.default("sorry, No pacakages available", httpStatus_1.HttpStatus.NOT_FOUND);
    }
    return getAllPackage;
});
exports.userGetAllPackageUseCase = userGetAllPackageUseCase;
const userPackageBookingUseCase = (bookingDetails, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userRepository.packageBooking(bookingDetails);
    return result;
});
exports.userPackageBookingUseCase = userPackageBookingUseCase;
const getPackageUseCase = (packageId, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userRepository.getPackage(packageId);
    if (!result) {
        throw new appError_1.default("Package Not Found", httpStatus_1.HttpStatus.NOT_FOUND);
    }
    return result;
});
exports.getPackageUseCase = getPackageUseCase;
const signInWithGoogle = (credential, googleAuthService, userRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield googleAuthService.verify(credential);
    const isUserExist = yield userRepository.getUserByEmail(user.email);
    if (isUserExist) {
        const payload = {
            id: isUserExist._id.toString(),
            role: "user",
        };
        const token = authService.generateToken(payload);
        return {
            token,
            user
        };
    }
    else {
        const userData = yield userRepository.addUser(user);
        const payload = { id: userData._id.toString(), role: "user" };
        const token = authService.generateToken(payload);
        return {
            token,
            userData
        };
    }
});
exports.signInWithGoogle = signInWithGoogle;
const getUserDetailsUseCase = (userId, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield userRepository.getUserDetails(userId);
    return userData;
});
exports.getUserDetailsUseCase = getUserDetailsUseCase;
const updateUserProfileUseCase = (userId, editedUser, userRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    if (editedUser.password) {
        editedUser.password = yield authService.hashPassword(editedUser.password);
    }
    const result = yield userRepository.updateUserProfile(userId, editedUser);
    if (!result) {
        throw new appError_1.default('could not update user profile', httpStatus_1.HttpStatus.NOT_FOUND);
    }
    return result;
});
exports.updateUserProfileUseCase = updateUserProfileUseCase;
const userPasswordUpdateUseCase = (userId, eitedPassword, userRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield userRepository.getUserDetails(userId);
    const userDbPassword = userData === null || userData === void 0 ? void 0 : userData.password;
    const isPasswordCorrect = yield authService.comparePassword(eitedPassword.oldPassword, userDbPassword !== null && userDbPassword !== void 0 ? userDbPassword : "");
    if (!isPasswordCorrect) {
        throw new appError_1.default("sorry, your password was incorrect.Please double-check your password", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const newPassword = yield authService.hashPassword(eitedPassword.newPassword);
    const obj = {
        password: newPassword
    };
    const result = yield userRepository.userPasswordUpdate(userId, obj);
    return result;
});
exports.userPasswordUpdateUseCase = userPasswordUpdateUseCase;
const updatePasswordWithEmailUseCase = (emailId, eitedPassword, userRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const newPassword = yield authService.hashPassword(eitedPassword.newPassword);
    const obj = {
        password: newPassword
    };
    const email = emailId.toString();
    const result = yield userRepository.userPasswordUpdatewithEmail(email, obj);
    return result;
});
exports.updatePasswordWithEmailUseCase = updatePasswordWithEmailUseCase;
const getUserBookedDetailsUseCase = (userId, packageId, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userRepository.getUserBookedDetails(userId, packageId);
    if (!result) {
        throw new appError_1.default('could not the details', httpStatus_1.HttpStatus.NOT_FOUND);
    }
    return result;
});
exports.getUserBookedDetailsUseCase = getUserBookedDetailsUseCase;
const getAllBookingsUseCase = (userId, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userRepository.getAllBookings(userId);
    if (!result) {
        throw new appError_1.default('this user have no booking', httpStatus_1.HttpStatus.NOT_FOUND);
    }
    return result;
});
exports.getAllBookingsUseCase = getAllBookingsUseCase;
const paymentStatusChangeUseCase = (tourId, userDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userDbRepository.paymentStatusChange(tourId);
    if (!result) {
        throw new appError_1.default('payment Status not changed ', httpStatus_1.HttpStatus.NOT_MODIFIED);
    }
    return result;
});
exports.paymentStatusChangeUseCase = paymentStatusChangeUseCase;
const getAlertMsgUseCase = (userId, userDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userDbRepository.getAlertMsg(userId);
    if (!result) {
        throw new Error('could not find alert messages');
    }
    return result;
});
exports.getAlertMsgUseCase = getAlertMsgUseCase;
const createCommunityUseCase = (obj, userDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userDbRepository.createCommunity(obj);
    if (!result) {
        throw new Error('could not create community');
    }
    return result;
});
exports.createCommunityUseCase = createCommunityUseCase;
const getAllCommunityUseCase = (userDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userDbRepository.getAllCommunity();
    if (!result) {
        throw new appError_1.default('NO Communities found!', httpStatus_1.HttpStatus.NOT_FOUND);
    }
    return result;
});
exports.getAllCommunityUseCase = getAllCommunityUseCase;
const joinCommunityUseCase = (obj, userDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userDbRepository.joinCommunity(obj);
    if (!result) {
        throw new appError_1.default('could not  join community', httpStatus_1.HttpStatus.NOT_MODIFIED);
    }
    return result;
});
exports.joinCommunityUseCase = joinCommunityUseCase;
const getAllJoinedAndNotJoinedCommunityUseCase = (userId, userDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userDbRepository.getAllJoinedAndNotJoinedCommunity(userId);
    if (!result) {
        throw new appError_1.default('could not find commuity', httpStatus_1.HttpStatus.NOT_FOUND);
    }
    return result;
});
exports.getAllJoinedAndNotJoinedCommunityUseCase = getAllJoinedAndNotJoinedCommunityUseCase;
const createConversationUseCase = (conversationObj, userDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userDbRepository.createConversation(conversationObj);
    if (!result) {
        throw new appError_1.default('could not create conversation', httpStatus_1.HttpStatus.NOT_MODIFIED);
    }
    return result;
});
exports.createConversationUseCase = createConversationUseCase;
const getAllConversationUseCase = (communityId, userDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userDbRepository.getAllConversation(communityId);
    if (!result) {
        throw new appError_1.default('no conversation found!', httpStatus_1.HttpStatus.NOT_FOUND);
    }
    return result;
});
exports.getAllConversationUseCase = getAllConversationUseCase;
const getAllUniqueCategoryUseCase = (userDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userDbRepository.getAllUniqueCategory();
    if (!result) {
        throw new appError_1.default('could not find unique category', httpStatus_1.HttpStatus.NOT_FOUND);
    }
    return result;
});
exports.getAllUniqueCategoryUseCase = getAllUniqueCategoryUseCase;
const generateOTPUseCase = (userEmail, userDbRepository, sendMailService) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistingEmail = yield userDbRepository.getUserByEmail(userEmail);
    if (!isExistingEmail) {
        throw new appError_1.default(`could not find user in this email`, httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    //call the generate otp function to the userEmail
    sendMailService.sentEmail(userEmail);
    return isExistingEmail;
});
exports.generateOTPUseCase = generateOTPUseCase;
const verifiyOTPUseCase = (userOTP, sendMailService) => __awaiter(void 0, void 0, void 0, function* () {
    const response = sendMailService.verifyOTP(userOTP);
    if (response.message === 'OTP verified') {
        return true;
    }
    else if (response.message === 'OTP is expired') {
        throw new appError_1.default('OTP is expired!', httpStatus_1.HttpStatus.NOT_ACCEPTABLE);
    }
    else {
        throw new appError_1.default('OTP is Invalid!', httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
});
exports.verifiyOTPUseCase = verifiyOTPUseCase;
