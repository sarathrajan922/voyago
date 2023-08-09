"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paymentServiceInterface_1 = require("../../../application/services/paymentServiceInterface");
const paymentService_1 = require("../../services/paymentService");
const paymentController_1 = __importDefault(require("../../../adapters/controller/paymentController"));
const userDBrepository_1 = require("../../../application/repository/userDBrepository");
const userRepoMongoDB_1 = require("../../database/mongodb/repositories/userRepoMongoDB");
const paymentRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, paymentController_1.default)(paymentServiceInterface_1.paymentServiceInterface, paymentService_1.paymentService, userDBrepository_1.userDbRepository, userRepoMongoDB_1.userRepositoryMongoDB);
    router.get('/stripe/get-config', controller.getConfig);
    router.post('/stripe/create-payment-intent', controller.createPaymentIntent);
    return router;
};
exports.default = paymentRouter;
