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
exports.getUserCountAndBookingCountUseCase = exports.getAgentRevenueUseCase = exports.getAgentBookingStatUseCase = exports.paymentAlertUseCase = exports.agentProfileUpdateUseCase = exports.getAgentProfileUseCase = exports.checkAgentVerificationUseCase = exports.AgentGetAllBookingsUseCase = exports.deletePackageUseCase = exports.updatePackageUseCase = exports.disablepackageUseCase = exports.getPackageUseCase = exports.getAllPackageUseCase = exports.addTourPackageUseCase = exports.deleteCategoryUseCase = exports.getAgentCategoryUseCase = exports.agentAddCategoryUseCase = exports.agentLoginUseCase = exports.agentRegisterUseCase = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const agentRegisterUseCase = (agent, agentRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    agent.email = agent.email;
    console.log(agent);
    const isExistingEmail = yield agentRepository.getAgentByEmail(agent.email);
    if (isExistingEmail) {
        throw new appError_1.default("existing email", httpStatus_1.HttpStatus.CONFLICT);
    }
    if (agent.password) {
        agent.password = yield authService.hashPassword(agent.password);
    }
    const agentData = yield agentRepository.addAgent(agent);
    const payload = {
        id: agentData === null || agentData === void 0 ? void 0 : agentData._id.toString(),
        role: 'agent'
    };
    const token = authService.generateToken(payload);
    return {
        token,
        agentData
    };
});
exports.agentRegisterUseCase = agentRegisterUseCase;
const agentLoginUseCase = (email, password, agentRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const agentData = yield agentRepository.getAgentByEmail(email);
    if (!agentData) {
        throw new appError_1.default("this user doesn't exist", httpStatus_1.HttpStatus.NOT_FOUND);
    }
    const isPasswordCorrect = yield authService.comparePassword(password, (_a = agentData === null || agentData === void 0 ? void 0 : agentData.password) !== null && _a !== void 0 ? _a : '');
    if (!isPasswordCorrect) {
        throw new appError_1.default('sorry, your password was incorrect.Please double-check your password', httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const isAgentActive = yield agentRepository.checkAgentBlock(email);
    if (!isAgentActive) {
        throw new appError_1.default('Agent blocked by Admin', httpStatus_1.HttpStatus.NOT_ACCEPTABLE);
    }
    let id = '';
    if (agentData) {
        id = (_c = (_b = agentData === null || agentData === void 0 ? void 0 : agentData._id) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : '';
    }
    const payload = {
        id: id,
        role: 'agent'
    };
    const token = authService.generateToken(payload);
    return {
        token,
        agentData
    };
});
exports.agentLoginUseCase = agentLoginUseCase;
const agentAddCategoryUseCase = (category, agentRepository) => __awaiter(void 0, void 0, void 0, function* () {
    //! check category is already exist
    const agentId = category.agentId;
    const categroyName = category.name;
    const isCategoryExist = yield agentRepository.checkCategoryExist(agentId !== null && agentId !== void 0 ? agentId : '', categroyName !== null && categroyName !== void 0 ? categroyName : '');
    if (isCategoryExist) {
        throw new appError_1.default('Category Already Exists', httpStatus_1.HttpStatus.CONFLICT);
    }
    const result = yield agentRepository.addCategory(category);
    return result;
});
exports.agentAddCategoryUseCase = agentAddCategoryUseCase;
const getAgentCategoryUseCase = (objId, agentRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield agentRepository.getCategory(objId);
    return result;
});
exports.getAgentCategoryUseCase = getAgentCategoryUseCase;
const deleteCategoryUseCase = (agentId, categoryName, agentRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield agentRepository.deleteCategory(agentId, categoryName);
    return result;
});
exports.deleteCategoryUseCase = deleteCategoryUseCase;
const addTourPackageUseCase = (tourPackage, agentRepository) => __awaiter(void 0, void 0, void 0, function* () {
    //! check the package name is already exists
    const result = yield agentRepository.addPackage(tourPackage);
    return result;
});
exports.addTourPackageUseCase = addTourPackageUseCase;
const getAllPackageUseCase = (agentId, agentRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield agentRepository.getAllPackage(agentId);
    return result;
});
exports.getAllPackageUseCase = getAllPackageUseCase;
const getPackageUseCase = (packageId, agentRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield agentRepository.getPackage(packageId);
    if (!result) {
        throw new appError_1.default('package not found', httpStatus_1.HttpStatus.NOT_FOUND);
    }
    return result;
});
exports.getPackageUseCase = getPackageUseCase;
const disablepackageUseCase = (packageId, agentRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield agentRepository.disablePackage(packageId);
    if (!result) {
        throw new appError_1.default('could  not disable package', httpStatus_1.HttpStatus.NOT_FOUND);
    }
    return result;
});
exports.disablepackageUseCase = disablepackageUseCase;
const updatePackageUseCase = (editedPackage, packageId, agentRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield agentRepository.updatePackage(editedPackage, packageId);
    if (!result) {
        throw new appError_1.default('could not update package', httpStatus_1.HttpStatus.NOT_FOUND);
    }
    return result;
});
exports.updatePackageUseCase = updatePackageUseCase;
const deletePackageUseCase = (packageId, agentRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield agentRepository.deletePackage(packageId);
    return result;
});
exports.deletePackageUseCase = deletePackageUseCase;
const AgentGetAllBookingsUseCase = (agentId, agentRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield agentRepository.getAllBookings(agentId);
    return result;
});
exports.AgentGetAllBookingsUseCase = AgentGetAllBookingsUseCase;
const checkAgentVerificationUseCase = (agentId, agentRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield agentRepository.checkAgentVerified(agentId);
    return result;
});
exports.checkAgentVerificationUseCase = checkAgentVerificationUseCase;
const getAgentProfileUseCase = (agentId, agentRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield agentRepository.getAgentProfile(agentId);
    if (!result) {
        throw new appError_1.default('could not find agent profile', httpStatus_1.HttpStatus.NOT_FOUND);
    }
    return result;
});
exports.getAgentProfileUseCase = getAgentProfileUseCase;
const agentProfileUpdateUseCase = (agentId, editedData, agentRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    if (editedData.password) {
        editedData.password = yield authService.hashPassword(editedData.password);
    }
    const result = yield agentRepository.agentProfileUpdate(agentId, editedData);
    if (!result) {
        throw new appError_1.default('could not update agent profile', httpStatus_1.HttpStatus.NOT_MODIFIED);
    }
    return result;
});
exports.agentProfileUpdateUseCase = agentProfileUpdateUseCase;
const paymentAlertUseCase = (obj, agentRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield agentRepository.paymentAlert(obj);
    if (!result) {
        throw new appError_1.default('could not add alert message into DB', httpStatus_1.HttpStatus.NOT_MODIFIED);
    }
    return result;
});
exports.paymentAlertUseCase = paymentAlertUseCase;
const getAgentBookingStatUseCase = (agentId, agentRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield agentRepository.getAgentBookingStat(agentId);
    if (!result) {
        throw new appError_1.default('could not find booking status', httpStatus_1.HttpStatus.NOT_FOUND);
    }
    return result;
});
exports.getAgentBookingStatUseCase = getAgentBookingStatUseCase;
const getAgentRevenueUseCase = (agentId, agentDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield agentDbRepository.getRevenue(agentId);
    if (!result) {
        throw new appError_1.default('could not find revene', httpStatus_1.HttpStatus.NOT_FOUND);
    }
    return result;
});
exports.getAgentRevenueUseCase = getAgentRevenueUseCase;
const getUserCountAndBookingCountUseCase = (agentId, agentDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield agentDbRepository.getUserCountAndBookingCount(agentId);
    if (!result) {
        throw new appError_1.default('could not get user count and booking count', httpStatus_1.HttpStatus.NOT_FOUND);
    }
    return result;
});
exports.getUserCountAndBookingCountUseCase = getUserCountAndBookingCountUseCase;
