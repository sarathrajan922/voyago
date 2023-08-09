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
exports.adminRepossitoryMongoDB = void 0;
const adminModel_1 = __importDefault(require("../models/adminModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const agentModel_1 = __importDefault(require("../models/agentModel"));
const mongoose_1 = require("mongoose");
const tourPackageModel_1 = __importDefault(require("../models/tourPackageModel"));
const tourConfirmDetails_1 = __importDefault(require("../models/tourConfirmDetails"));
const adminRepossitoryMongoDB = () => {
    const getAdminByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        return adminModel_1.default.findOne({ email });
    });
    const getAllusers = () => __awaiter(void 0, void 0, void 0, function* () {
        const AllUsers = yield userModel_1.default.find();
        return AllUsers;
    });
    const getAllAgents = () => __awaiter(void 0, void 0, void 0, function* () {
        const AllAgents = yield agentModel_1.default.find();
        return AllAgents;
    });
    const blockUser = (objId) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.Types.ObjectId(objId);
        const user = yield userModel_1.default.findById(id);
        const status = !(user === null || user === void 0 ? void 0 : user.isActive);
        const result = yield userModel_1.default.findOneAndUpdate({ _id: id }, { $set: { isActive: status } });
        return result;
    });
    const blockAgent = (objId) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.Types.ObjectId(objId);
        const agent = yield agentModel_1.default.findById(id);
        const status = !(agent === null || agent === void 0 ? void 0 : agent.isActive);
        const result = yield agentModel_1.default.findOneAndUpdate({ _id: id }, { $set: { isActive: status } });
        return result;
    });
    const getUnverifiedAgents = () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield agentModel_1.default.find({ isVerified: false });
        return result;
    });
    const verifyAgent = (objId) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.Types.ObjectId(objId);
        const result = yield agentModel_1.default.findOneAndUpdate({
            _id: id,
        }, {
            $set: { isVerified: true },
        });
        return result;
    });
    const BasicDetailsUserAgentPackageBooking = () => __awaiter(void 0, void 0, void 0, function* () {
        const UserCount = yield userModel_1.default.countDocuments({});
        const AgentCount = yield agentModel_1.default.countDocuments({});
        const PackageCount = yield tourPackageModel_1.default.countDocuments({});
        const BookingCount = yield tourConfirmDetails_1.default.find({ payment: "success" }).count();
        const resObj = {
            UserCount,
            AgentCount,
            PackageCount,
            BookingCount,
        };
        console.log(resObj);
        return resObj;
    });
    // const getAllAgents = async ()=>{
    //     const AllAgents = await repository.getAllAgents();
    //     return AllAgents
    // }
    const getAgentStatus = () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield agentModel_1.default.aggregate([
            {
                $group: {
                    _id: null,
                    activeCount: {
                        $sum: { $cond: [{ $eq: ["$isActive", true] }, 1, 0] },
                    },
                    inactiveCount: {
                        $sum: { $cond: [{ $eq: ["$isActive", false] }, 1, 0] },
                    },
                    verifiedCount: {
                        $sum: { $cond: [{ $eq: ["$isVerified", true] }, 1, 0] },
                    },
                    notVerifiedCount: {
                        $sum: { $cond: [{ $eq: ["$isVerified", false] }, 1, 0] },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                },
            },
        ]);
        return result[0];
    });
    const AllBookingStat = () => __awaiter(void 0, void 0, void 0, function* () {
        const bookingCounts = Array.from({ length: 12 }, () => 0);
        const data = yield tourConfirmDetails_1.default.aggregate([
            {
                $match: {
                    payment: 'success' // Find documents with payment "success"
                }
            },
            {
                $group: {
                    _id: { $month: { date: { $toDate: '$travelDate' } } },
                    count: { $sum: 1 } // Count the bookings for each month
                }
            }
        ]);
        data.forEach((data) => {
            const monthIndex = data._id - 1;
            bookingCounts[monthIndex] = data.count;
        });
        return bookingCounts;
    });
    const getRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield tourConfirmDetails_1.default.aggregate([
            {
                $match: { payment: 'success' },
            },
            {
                $addFields: {
                    packageIdObj: {
                        $toObjectId: "$packageId",
                    },
                },
            },
            {
                $lookup: {
                    from: "tourPackages",
                    localField: "packageIdObj",
                    foreignField: "_id",
                    as: "package",
                },
            },
            { $unwind: '$package' },
            {
                $set: {
                    total: { $multiply: ['$package.price', '$person'] },
                },
            },
            {
                $set: {
                    adminProfit: {
                        $multiply: ['$total', 0.05]
                    }
                }
            },
            {
                $set: {
                    agentGet: { $subtract: ['$total', { $multiply: ['$total', 0.05] }] },
                },
            },
            {
                $project: {
                    firstName: 1,
                    lastName: 1,
                    Email: 1,
                    travelDate: 1,
                    person: 1,
                    packageId: 1,
                    userId: 1,
                    payment: 1,
                    agentId: 1,
                    total: 1,
                    agentGet: 1,
                    adminProfit: 1
                },
            },
        ]);
        let agentRevenue = 0;
        for (const tourConfirm of data) {
            agentRevenue += tourConfirm.agentGet;
        }
        let adminRevenue = 0;
        for (const tourConfirm of data) {
            adminRevenue += tourConfirm.adminProfit;
        }
        return {
            data,
            agentRevenue,
            adminRevenue
        };
    });
    return {
        getAdminByEmail,
        getAllusers,
        getAllAgents,
        blockUser,
        blockAgent,
        getUnverifiedAgents,
        verifyAgent,
        BasicDetailsUserAgentPackageBooking,
        getAgentStatus,
        AllBookingStat,
        getRevenue
    };
};
exports.adminRepossitoryMongoDB = adminRepossitoryMongoDB;
