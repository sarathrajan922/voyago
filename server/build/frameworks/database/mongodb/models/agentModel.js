"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const agentScheme = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, "please add a first name"]
    },
    lastName: {
        type: String,
        required: [true, "please add a last name"]
    },
    email: {
        type: String,
        required: [true, "please add a email"]
    },
    mobile: {
        type: Number,
        required: [true, "please add a mobile number"]
    },
    password: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    idProof_img: {
        type: String,
        // required: [true,"please upload id proof image"]
    }
});
const Agent = (0, mongoose_1.model)('Agent', agentScheme, 'agents');
exports.default = Agent;
