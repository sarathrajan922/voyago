"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CoversationSchema = new mongoose_1.Schema({
    communityId: {
        type: String,
        required: [true, 'please specify a community Id']
    },
    message: {
        type: String,
        required: [true, 'please specify a message']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    senderId: {
        type: String,
        required: [true, 'please specify a sender Id']
    }
});
const Conversation = (0, mongoose_1.model)('Conversation', CoversationSchema, 'conversation');
exports.default = Conversation;
