"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("./frameworks/webserver/express"));
const server_1 = __importDefault(require("./frameworks/webserver/server"));
const express_2 = __importDefault(require("express"));
const app = (0, express_2.default)();
(0, express_1.default)(app);
const server = http_1.default.createServer(app);
(0, server_1.default)(server).startServer();
