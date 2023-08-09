"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const configKeys = {
    MONGO_DB_URL: process.env.DATABASE,
    PORT: process.env.PORT,
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    // NODE_ENV: process.env.NODE_ENV as string,
    GOOGLE_AUTH_CLIENT: process.env.GOOGLE_AUTH_CLIENT,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    // EMAIL_NODE_MAILER: process.env.EMAIL_USERNAME as string,
    EMAIL_NODE_MAILER: process.env.NODE_MAILER_EMAIL_ID,
    PASS_NODE_MAILER: process.env.NODE_MAILER_PASS
};
exports.default = configKeys;
