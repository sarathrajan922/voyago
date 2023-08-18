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
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set("strictQuery", true);
const config_1 = __importDefault(require("../../../config"));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const dbObject = {
        dbName: config_1.default.DB_NAME,
    };
    try {
        yield mongoose_1.default.connect(config_1.default.MONGO_DB_URL, dbObject);
        console.log(`Database connected successfully`);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
});
exports.default = connectDB;
