"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tourConfirmSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'please add a first name']
    },
    lastName: {
        type: String,
        required: [true, 'please add a last name']
    },
    Email: {
        type: String,
        required: [true, 'please add a email']
    },
    travelDate: {
        type: String,
        required: [true, 'please valid  date']
    },
    person: {
        type: Number,
        required: [true, 'please add no:of person required']
    },
    packageId: {
        type: String,
        required: [true, 'please add packageId']
    },
    userId: {
        type: String,
        required: [true, 'please add userId']
    },
    payment: {
        type: String,
        default: 'pending'
    },
    agentId: {
        type: String,
        required: [true, 'agnetId is missing please add!']
    }
});
const TourConfirm = (0, mongoose_1.model)("TourConfirm", tourConfirmSchema, 'tourConfirmDetails');
exports.default = TourConfirm;
