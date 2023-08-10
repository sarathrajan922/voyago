"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = __importDefault(require("./admin"));
const agent_1 = __importDefault(require("./agent"));
const user_1 = __importDefault(require("./user"));
const payment_1 = __importDefault(require("./payment"));
const router = (app) => {
    app.use("/api/auth", (0, user_1.default)());
    app.use("/api/admin", (0, admin_1.default)());
    app.use("/api/agent", (0, agent_1.default)());
    app.use('/api/pay', (0, payment_1.default)());
};
exports.default = router;
