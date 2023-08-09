"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userAlertMessageSchema = new mongoose_1.Schema({
    message: {
        type: String,
        require: [true, 'please provide a message']
    },
    userId: {
        type: String,
        required: [true, 'please provide userId']
    },
    agentId: {
        type: String,
        required: [true, 'please provide agentId']
    }
});
const UserAlertMsg = (0, mongoose_1.model)('UserAlertMsg', userAlertMessageSchema, 'userAlertMessage');
exports.default = UserAlertMsg;
