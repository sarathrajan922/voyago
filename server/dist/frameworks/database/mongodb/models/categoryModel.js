"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "please add a category name"]
    },
    agentId: {
        type: String,
        required: [true, "please add a agent id"]
    }
});
const Category = (0, mongoose_1.model)('Category', categorySchema, 'tourCategory');
exports.default = Category;
