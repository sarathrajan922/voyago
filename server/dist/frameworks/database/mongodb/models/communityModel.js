"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const communitySchema = new mongoose_1.Schema({
    communityName: {
        type: String,
        required: [true, "please specify a community name"]
    },
    admin: {
        type: String,
        required: [true, 'please add a userId']
    },
    members: {
        type: Array
    }
});
const Community = (0, mongoose_1.model)('Community', communitySchema, 'community');
exports.default = Community;
