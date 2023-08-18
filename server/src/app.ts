import dotenv from 'dotenv';
dotenv.config();

import http from 'http'
import expressConfig from './frameworks/webserver/express'
import router from './frameworks/webserver/routes'
import serverConfig from './frameworks/webserver/server'
import express, {Application} from 'express'
import connectDB from './frameworks/database/mongodb/connection'
import errorHandlingMiddleware from './frameworks/webserver/middlewares/errorHandle'
import socketConfig from './frameworks/websocket/socket';
import { Server } from 'socket.io';
const app:Application = express()
expressConfig(app)
//connecting mongoDb
connectDB();
const server = http.createServer(app)

//* web socket connection
const io = new Server<any>(server,{
    cors:{
        origin:true,
        methods:["GET","POST"]
    }
  });
  
  socketConfig(io)
router(app)
app.use(errorHandlingMiddleware)
serverConfig(server).startServer()


