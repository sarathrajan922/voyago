"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userScheme = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, "please add a first name"]
    },
    lastName: {
        type: String,
        // required: [true, "please add a last name"]
    },
    email: {
        type: String,
        required: [true, "please add a email"],
        unique: true
    },
    mobile: {
        type: Number,
    },
    password: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isGoogleUser: {
        type: Boolean,
        default: false
    }
});
const User = (0, mongoose_1.model)("User", userScheme, "users");
exports.default = User;
