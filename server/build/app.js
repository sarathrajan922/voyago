"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("./frameworks/webserver/express"));
const routes_1 = __importDefault(require("./frameworks/webserver/routes"));
const server_1 = __importDefault(require("./frameworks/webserver/server"));
const express_2 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./frameworks/database/mongodb/connection"));
const errorHandle_1 = __importDefault(require("./frameworks/webserver/middlewares/errorHandle"));
const socket_1 = __importDefault(require("./frameworks/websocket/socket"));
const socket_io_1 = require("socket.io");
const app = (0, express_2.default)();
(0, express_1.default)(app);
//connecting mongoDb
(0, connection_1.default)();
const server = http_1.default.createServer(app);
//* web socket connection
const io = new socket_io_1.Server(server, {
    cors: {
        origin: true,
        methods: ["GET", "POST"]
    }
});
(0, socket_1.default)(io);
(0, routes_1.default)(app);
app.use(errorHandle_1.default);
(0, server_1.default)(server).startServer();
