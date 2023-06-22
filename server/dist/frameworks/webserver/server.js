"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import configKeys from "../../config";
const port = 8000;
const serverConfig = (server) => {
    const startServer = () => {
        server.listen(port, () => {
            console.log(`Server listening on Port ${port}`);
        });
    };
    return {
        startServer
    };
};
exports.default = serverConfig;
