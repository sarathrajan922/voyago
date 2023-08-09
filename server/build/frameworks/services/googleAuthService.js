"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuthService = void 0;
const google_auth_library_1 = require("google-auth-library");
const config_1 = __importDefault(require("../../config"));
const client = new google_auth_library_1.OAuth2Client(config_1.default.GOOGLE_AUTH_CLIENT);
const googleAuthService = () => {
    const verify = (token) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(token);
        const user = {
            firstName: "",
            lastName: "",
            email: "",
            // profilePic: "",
            isGoogleUser: true,
        };
        const ticket = yield client.verifyIdToken({
            idToken: token,
            audience: "761849749944-pi94r5hl0n2t0ql4q7n08hl2a212k386.apps.googleusercontent.com",
        });
        console.log(ticket);
        const payload = ticket.getPayload();
        console.log(payload);
        if ((payload === null || payload === void 0 ? void 0 : payload.given_name) && payload.email && payload.picture) {
            const nameParts = payload.given_name.trim().split(" ");
            const firstName = nameParts[0];
            const lastName = nameParts.slice(1).join(" ");
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = payload.email;
            // user.profilePic = payload.picture;
        }
        return user;
    });
    return {
        verify,
    };
};
exports.googleAuthService = googleAuthService;
