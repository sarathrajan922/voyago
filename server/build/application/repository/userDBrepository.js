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
exports.userDbRepository = void 0;
const userDbRepository = (repository) => {
    const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.addUser(user); });
    const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getUserByEmail(email); });
    const checkUserBlock = (email) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.checkUserBlock(email); });
    const getAllPackage = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllTourPackage(); });
    const packageBooking = (bookingDetails) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.bookPackage(bookingDetails); });
    const getPackage = (packageId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getPackage(packageId); });
    const getUserDetails = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getUserDetails(userId); });
    const updateUserProfile = (userId, editedUser) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.userProfileUpdate(userId, editedUser); });
    const userPasswordUpdate = (userId, editedPassword) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.userPasswordUpdate(userId, editedPassword); });
    const getUserBookedDetails = (userId, packageId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getUserBookedDetails(userId, packageId); });
    const getPrice = (packageId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getPrice(packageId); });
    const getAllBookings = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllBookings(userId); });
    const paymentStatusChange = (tourId) => __awaiter(void 0, void 0, void 0, function* () { return repository.paymentStatusChange(tourId); });
    const getAlertMsg = (userId) => __awaiter(void 0, void 0, void 0, function* () { return repository.getAlertMsg(userId); });
    const createCommunity = (obj) => __awaiter(void 0, void 0, void 0, function* () { return repository.createCommunity(obj); });
    const getAllCommunity = () => __awaiter(void 0, void 0, void 0, function* () { return repository.getAllCommunity(); });
    const joinCommunity = (obj) => __awaiter(void 0, void 0, void 0, function* () { return repository.joinCommunity(obj); });
    const getAllJoinedAndNotJoinedCommunity = (userId) => __awaiter(void 0, void 0, void 0, function* () { return repository.getAllJoinedAndNotJoinedCommunity(userId); });
    const createConversation = (conversationObj) => __awaiter(void 0, void 0, void 0, function* () { return repository.createConversation(conversationObj); });
    const getAllConversation = (communityId) => __awaiter(void 0, void 0, void 0, function* () { return repository.getAllConversation(communityId); });
    const getAllUniqueCategory = () => __awaiter(void 0, void 0, void 0, function* () { return repository.getAllUniqueCategory(); });
    const userPasswordUpdatewithEmail = (email, editedPassword) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.userPasswordUpdatewithEmail(email, editedPassword); });
    return {
        addUser,
        getUserByEmail,
        getAllPackage,
        packageBooking,
        getPackage,
        checkUserBlock,
        getUserDetails,
        updateUserProfile,
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
exports.userDbRepository = userDbRepository;
