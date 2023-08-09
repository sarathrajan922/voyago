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
exports.agentRepositoryMongoDB = void 0;
const agentModel_1 = __importDefault(require("../models/agentModel"));
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const tourPackageModel_1 = __importDefault(require("../models/tourPackageModel"));
const mongoose_1 = require("mongoose");
const tourConfirmDetails_1 = __importDefault(require("../models/tourConfirmDetails"));
const userAlertMessageModel_1 = __importDefault(require("../models/userAlertMessageModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const agentRepositoryMongoDB = () => {
    const addAgent = (agent) => __awaiter(void 0, void 0, void 0, function* () {
        return yield agentModel_1.default.create(agent);
    });
    const getAgentByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        return agentModel_1.default.findOne({ email });
    });
    const checkAgentBlock = (email) => __awaiter(void 0, void 0, void 0, function* () {
        return agentModel_1.default.findOne({ email: email, isActive: true });
    });
    const checkCategoryExist = (agentId, categoryName) => __awaiter(void 0, void 0, void 0, function* () {
        return yield categoryModel_1.default.findOne({
            agentId: agentId,
            name: categoryName,
        });
    });
    const addCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
        return categoryModel_1.default.create(category);
    });
    const getCategory = (objId) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.Types.ObjectId(objId);
        return categoryModel_1.default.find({ agentId: id });
    });
    const deleteCategory = (agentId, categoryName) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.Types.ObjectId(agentId);
        return categoryModel_1.default.findOneAndDelete({ agentId: id, name: categoryName });
    });
    const addPackage = (tourPackage) => __awaiter(void 0, void 0, void 0, function* () {
        return yield tourPackageModel_1.default.create(tourPackage);
    });
    const getAllPackages = (objId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield tourPackageModel_1.default.find({ agnetId: objId });
    });
    const getPackage = (objId) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.Types.ObjectId(objId);
        return yield tourPackageModel_1.default.findOne({ _id: id });
    });
    const disablePackage = (packageId) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.Types.ObjectId(packageId);
        return yield tourPackageModel_1.default.findOneAndUpdate({ _id: id }, {
            $set: { isDisabled: true },
        });
    });
    const updatePackage = (editedPackage, packageId) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.Types.ObjectId(packageId);
        try {
            const updatedPackage = yield tourPackageModel_1.default.findByIdAndUpdate(id, {
                $set: Object.assign({}, editedPackage),
            });
            return updatedPackage;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
    const deletePackage = (packageId) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.Types.ObjectId(packageId);
        const deletePackage = yield tourPackageModel_1.default.findByIdAndDelete(id);
        return deletePackage;
    });
    const getAllBookings = (agentId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield tourConfirmDetails_1.default.aggregate([
            {
                $match: { agentId },
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
                    as: "packageDetails",
                },
            },
            {
                $unwind: "$packageDetails",
            },
        ]);
        return data;
    });
    const checkAgentVerified = (agentId) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.Types.ObjectId(agentId);
        const result = yield agentModel_1.default.findOne({ _id: id, isVerified: true });
        return result ? true : false;
    });
    const getAgentProfile = (agentId) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.Types.ObjectId(agentId);
        const result = yield agentModel_1.default.findOne({ _id: id });
        return result;
    });
    const agentProfileUpdate = (agentId, editedDetails) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.Types.ObjectId(agentId);
        try {
            const updatedAgent = yield agentModel_1.default.findByIdAndUpdate(id, {
                $set: Object.assign({}, editedDetails),
            });
            return updatedAgent;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
    const paymentAlert = (obj) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userAlertMessageModel_1.default.create(obj);
        return result;
    });
    const getAllAgentBookingStat = (agentId) => __awaiter(void 0, void 0, void 0, function* () {
        const bookingCounts = Array.from({ length: 12 }, () => 0);
        const data = yield tourConfirmDetails_1.default.aggregate([
            {
                $match: {
                    agentId: agentId,
                    payment: "success",
                },
            },
            {
                $group: {
                    _id: { $month: { date: { $toDate: "$travelDate" } } },
                    count: { $sum: 1 },
                },
            },
        ]);
        data.forEach((data) => {
            const monthIndex = data._id - 1;
            bookingCounts[monthIndex] = data.count;
        });
        return bookingCounts;
    });
    const getRevenue = (agentId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield tourConfirmDetails_1.default.aggregate([
            {
                $match: { agentId: agentId,
                    payment: 'success' },
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
            { $unwind: "$package" },
            {
                $set: {
                    total: { $multiply: ["$package.price", "$person"] },
                },
            },
            {
                $set: {
                    adminProfit: {
                        $multiply: ["$total", 0.05],
                    },
                },
            },
            {
                $set: {
                    agentGet: { $subtract: ["$total", { $multiply: ["$total", 0.05] }] },
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
                    adminProfit: 1,
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
            adminRevenue,
        };
    });
    const getUserCountAndBookingCount = (agentId) => __awaiter(void 0, void 0, void 0, function* () {
        const bookingCount = yield tourConfirmDetails_1.default.countDocuments({
            agentId: agentId,
            payment: 'success',
        });
        const userCount = yield userModel_1.default.countDocuments();
        return {
            bookingCount,
            userCount
        };
    });
    return {
        addAgent,
        getAgentByEmail,
        addCategory,
        getCategory,
        deleteCategory,
        addPackage,
        getAllPackages,
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
        getAllAgentBookingStat,
        getRevenue,
        getUserCountAndBookingCount,
    };
};
exports.agentRepositoryMongoDB = agentRepositoryMongoDB;
