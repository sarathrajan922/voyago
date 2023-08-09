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
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentDbRepository = void 0;
const agentDbRepository = (repository) => {
    const addAgent = (agent) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.addAgent(agent); });
    const getAgentByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAgentByEmail(email); });
    const checkAgentBlock = (email) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.checkAgentBlock(email); });
    const addCategory = (category) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.addCategory(category); });
    const checkCategoryExist = (agentId, categoryName) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.checkCategoryExist(agentId, categoryName); });
    const getCategory = (objId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getCategory(objId); });
    const deleteCategory = (agentId, categoryName) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.deleteCategory(agentId, categoryName); });
    const addPackage = (tourPackage) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.addPackage(tourPackage); });
    const getAllPackage = (objId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllPackages(objId); });
    const getPackage = (objId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getPackage(objId); });
    const disablePackage = (packageId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.disablePackage(packageId); });
    const updatePackage = (tourPackage, packageId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.updatePackage(tourPackage, packageId); });
    const deletePackage = (packageId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.deletePackage(packageId); });
    const getAllBookings = (agentId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllBookings(agentId); });
    const checkAgentVerified = (agentId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.checkAgentVerified(agentId); });
    const getAgentProfile = (agentId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAgentProfile(agentId); });
    const agentProfileUpdate = (agentId, editedData) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.agentProfileUpdate(agentId, editedData); });
    const paymentAlert = (obj) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.paymentAlert(obj); });
    const getAgentBookingStat = (agentId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllAgentBookingStat(agentId); });
    const getRevenue = (agentId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getRevenue(agentId); });
    const getUserCountAndBookingCount = (agentId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getUserCountAndBookingCount(agentId); });
    return {
        addAgent,
        getAgentByEmail,
        addCategory,
        getCategory,
        deleteCategory,
        addPackage,
        getAllPackage,
        getPackage,
        checkCategoryExist,
        disablePackage,
        updatePackage,
        deletePackage,
        checkAgentBlock,
        getAllBookings,
        checkAgentVerified,
        getAgentProfile,
        agentProfileUpdate,
        paymentAlert,
        getAgentBookingStat,
        getRevenue,
        getUserCountAndBookingCount
    };
};
exports.agentDbRepository = agentDbRepository;
