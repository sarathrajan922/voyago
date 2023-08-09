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
exports.userRepositoryMongoDB = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const tourPackageModel_1 = __importDefault(require("../models/tourPackageModel"));
const tourConfirmDetails_1 = __importDefault(require("../models/tourConfirmDetails"));
const mongoose_1 = require("mongoose");
const userAlertMessageModel_1 = __importDefault(require("../models/userAlertMessageModel"));
const communityModel_1 = __importDefault(require("../models/communityModel"));
const conversationModel_1 = __importDefault(require("../models/conversationModel"));
const userRepositoryMongoDB = () => {
    const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
        return yield userModel_1.default.create(user);
    });
    const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        return userModel_1.default.findOne({ email });
    });
    const checkUserBlock = (email) => __awaiter(void 0, void 0, void 0, function* () {
        return userModel_1.default.findOne({ email: email, isActive: true });
    });
    const getAllTourPackage = () => __awaiter(void 0, void 0, void 0, function* () {
        return tourPackageModel_1.default.find({});
    });
    const bookPackage = (bookingDetails) => __awaiter(void 0, void 0, void 0, function* () {
        return yield tourConfirmDetails_1.default.create(bookingDetails);
    });
    const getPackage = (packageId) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.Types.ObjectId(packageId);
        return yield tourPackageModel_1.default.findOne({ _id: id });
    });
    const getUserDetails = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.Types.ObjectId(userId);
        return yield userModel_1.default.findOne({ _id: id });
    });
    const userProfileUpdate = (userId, editedDetails) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.Types.ObjectId(userId);
        try {
            const updatedUser = yield userModel_1.default.findByIdAndUpdate(id, { $set: editedDetails }, { new: true });
            return updatedUser;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
    const userPasswordUpdate = (userId, editedPassword) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.Types.ObjectId(userId);
        try {
            const updatedPassword = yield userModel_1.default.findByIdAndUpdate(id, { $set: editedPassword }, { new: true });
            return true;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
    const userPasswordUpdatewithEmail = (email, editedPassword) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(email);
        try {
            const updatedPassword = yield userModel_1.default.findOneAndUpdate({ email }, { $set: editedPassword }, { new: true });
            return true;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
    const getUserBookedDetails = (userId, packageId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newData = yield tourConfirmDetails_1.default.aggregate([
                {
                    $match: { userId, packageId },
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
            return newData;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
    const getPrice = (packageId) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.Types.ObjectId(packageId);
        const price = yield tourPackageModel_1.default.findOne({ _id: id }, { price: 1 });
        return price;
    });
    const getAllBookings = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield tourConfirmDetails_1.default.aggregate([
            {
                $match: { userId: userId },
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
            {
                $addFields: {
                    packagePrice: "$package.price",
                },
            },
        ]).exec();
        return data;
    });
    const paymentStatusChange = (tourId) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.Types.ObjectId(tourId);
        const result = yield tourConfirmDetails_1.default.findByIdAndUpdate({ _id: id }, {
            $set: { payment: "success" },
        });
        return result;
    });
    const getAlertMsg = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield userAlertMessageModel_1.default.aggregate([
            {
                $match: { userId },
            },
            {
                $addFields: {
                    agentIdObj: {
                        $toObjectId: "$agentId",
                    },
                },
            },
            {
                $lookup: {
                    from: "agents",
                    localField: "agentIdObj",
                    foreignField: "_id",
                    as: "agentDetails",
                },
            },
            {
                $unwind: "$agentDetails",
            },
            {
                $project: {
                    agentId: 1,
                    message: 1,
                    agentDetails: 1,
                },
            },
        ]);
        console.log(data);
        return data;
    });
    const createCommunity = (obj) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield communityModel_1.default.create(obj);
        return result;
    });
    const getAllCommunity = () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield communityModel_1.default.find({});
        return result;
    });
    const joinCommunity = (obj) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const communityId = new mongoose_1.Types.ObjectId(obj.communityId);
            // First, find the community document using the provided communityId.
            const community = yield communityModel_1.default.findOne({ _id: communityId });
            if (!community) {
                console.log("Community not found");
                return false;
            }
            // Check if the userId is already a member of the community.
            if (community.members.includes(obj.userId)) {
                console.log("User is already a member of the community");
                return false;
            }
            // Add the userId to the members array and save the updated document.
            community.members.push(obj.userId);
            yield community.save();
            return true;
        }
        catch (error) {
            console.error("Error while joining community:", error);
            return false;
        }
    });
    const getAllJoinedAndNotJoinedCommunity = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Find all communities where the provided userId exists either in the admin or members array.
            const joinedCommunities = yield communityModel_1.default.find({
                $or: [{ admin: userId }, { members: userId }],
            });
            // Find all communities where the provided userId does not exist in the admin or members array.
            const notJoinedCommunities = yield communityModel_1.default.find({
                $nor: [{ admin: userId }, { members: userId }],
            });
            return {
                joinedCommunities,
                notJoinedCommunities,
            };
        }
        catch (error) {
            console.error('Error while fetching communities:', error);
            return null; // You can handle the error case as per your requirement.
        }
    });
    const createConversation = (conversationObj) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield conversationModel_1.default.create(conversationObj);
        return result;
    });
    const getAllConversation = (communityId) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield conversationModel_1.default.find({ communityId });
        return result;
    });
    const getAllUniqueCategory = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const result = yield tourPackageModel_1.default.aggregate([
            { $group: { _id: "$category" } },
            { $group: { _id: null, categories: { $addToSet: "$_id" } } },
            { $project: { _id: 0, categories: 1 } }
        ]);
        return (_a = result[0]) === null || _a === void 0 ? void 0 : _a.categories;
    });
    return {
        addUser,
        getUserByEmail,
        getAllTourPackage,
        bookPackage,
        getPackage,
        checkUserBlock,
        getUserDetails,
        userProfileUpdate,
        userPasswordUpdate,
        getUserBookedDetails,
        getPrice,
        getAllBookings,
        paymentStatusChange,
        getAlertMsg,
        createCommunity,
        getAllCommunity,
        joinCommunity,
        getAllJoinedAndNotJoinedCommunity,
        createConversation,
        getAllConversation,
        getAllUniqueCategory,
        userPasswordUpdatewithEmail
    };
};
exports.userRepositoryMongoDB = userRepositoryMongoDB;
