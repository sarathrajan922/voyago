"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const packageSchema = new mongoose_1.Schema({
    agentId: {
        type: String,
        required: [true, "please specify agentId"],
    },
    packageName: {
        type: String,
        required: [true, "please add  package name"],
    },
    description: {
        type: String,
        required: [true, "please add  description"],
    },
    price: {
        type: Number,
        required: [true, "please add  price"],
    },
    locations: {
        type: String,
        required: [true, "please add some location"],
    },
    category: {
        type: String,
        required: [true, "please add  category"],
    },
    isDisabled: {
        type: Boolean,
        default: false,
    },
    images: {
        type: String,
        required: [true, "please upload some images"],
    },
    duration: {
        type: Number,
        required: [true, "please specify a duraction"]
    },
    services: {
        type: String,
        required: [true, "please add some services"]
    }
});
const TourPackage = (0, mongoose_1.model)("TourPackage", packageSchema, "tourPackages");
exports.default = TourPackage;
