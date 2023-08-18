import { Server, Socket } from 'socket.io';
// import {
//   ClientToServerEvents,
//   InterServerEvents,
//   ServerToClientEvents,
//   SocketData,
// } from '../../types/socketInterfaces';

 const socketConfig = (
  io: Server<any>,
) => { 
    let users: any[] = [];

    const addUsers = (userId: string, socketId: string) => {
        !users.some(user => user.userId === userId) && users.push({ userId, socketId });
    };
    
    const removeUsers = (socketId: string) => {
        users = users.filter((user => user.socketId !== socketId));
    };
    
    const getUser = (userId: string) => {
        return users.find((user) => user.userId === userId);
    };
    
    io.on('connection', (socket: Socket) => {
        // when connect
        console.log('a user connected...');
        io.emit('welcome', "hello this is socket server!");
    
        socket.on('addUser', (userId: string) => {
            addUsers(userId, socket.id);
            io.emit('getUsers', users);
        });
    
        // send and get message
        socket.on('sendMessage', (data: { userId: string; message: string; communityIds: string[] }) => {
           
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

export default socketConfig;