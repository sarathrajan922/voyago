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
exports.adminDbRepository = void 0;
// import { AdminInterface } from "../../types/admin";
const adminDbRepository = (repository) => {
    const getAdminByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAdminByEmail(email); });
    const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllusers(); });
    const getAllAgents = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllAgents(); });
    const blockUser = (ojbId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.blockUser(ojbId); });
    const blockAgent = (ojbId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.blockAgent(ojbId); });
    const getUnverifiedAgents = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getUnverifiedAgents(); });
    const verifyAgent = (objId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.verifyAgent(objId); });
    const BasicDetailsUserAgentPackageBooking = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.BasicDetailsUserAgentPackageBooking(); });
    const getAgentStatus = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAgentStatus(); });
    const getAllBookingStat = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.AllBookingStat(); });
    const getRevenue = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getRevenue(); });
    return {
        getAdminByEmail,
        getAllUsers,
        getAllAgents,
        blockUser,
        blockAgent,
        getUnverifiedAgents,
        verifyAgent,
        BasicDetailsUserAgentPackageBooking,
        getAgentStatus,
        getAllBookingStat,
        getRevenue
    };
};
exports.adminDbRepository = adminDbRepository;
