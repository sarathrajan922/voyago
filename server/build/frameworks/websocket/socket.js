"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import {
//   ClientToServerEvents,
//   InterServerEvents,
//   ServerToClientEvents,
//   SocketData,
// } from '../../types/socketInterfaces';
const socketConfig = (io) => {
    let users = [];
    const addUsers = (userId, socketId) => {
        !users.some(user => user.userId === userId) && users.push({ userId, socketId });
    };
    const removeUsers = (socketId) => {
        users = users.filter((user => user.socketId !== socketId));
    };
    const getUser = (userId) => {
        return users.find((user) => user.userId === userId);
    };
    io.on('connection', (socket) => {
        // when connect
        console.log('a user connected...');
        io.emit('welcome', "hello this is socket server!");
        socket.on('addUser', (userId) => {
            addUsers(userId, socket.id);
            io.emit('getUsers', users);
        });
        // send and get message
        socket.on('sendMessage', (data) => {
            io.emit('getMessage', {
                senderId: data.userId,
                message: data.message,
                communityId: data.communityIds
            });
        });
        // when disconnect
        socket.on('disconnect', () => {
            console.log('a user disconnected!');
            removeUsers(socket.id);
            io.emit('getUsers', users);
        });
    });
};
exports.default = socketConfig;
