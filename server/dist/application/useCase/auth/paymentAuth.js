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
exports.getConfigU = exports.createPaymentIntentU = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const createPaymentIntentU = (packageId, person, userDbRepository, paymentService) => __awaiter(void 0, void 0, void 0, function* () {
    if (!packageId) {
        throw new appError_1.default('Please provide valid payment information', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    const amount = yield userDbRepository.getPrice(packageId);
    console.log("first");
    console.log(amount);
    let price;
    if (amount) {
        const count = parseInt(person);
        price = (amount === null || amount === void 0 ? void 0 : amount.price) * count;
        console.log(price);
    }
    else {
        throw new appError_1.default('someting went wrong', httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const response = yield paymentService.createPaymentIntent(price);
    return response;
});
exports.createPaymentIntentU = createPaymentIntentU;
const getConfigU = (paymentService) => paymentService.getConfig();
exports.getConfigU = getConfigU;
