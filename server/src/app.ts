import http from 'http'
import expressConfig from './frameworks/webserver/express'
import router from './frameworks/webserver/routes'
import serverConfig from './frameworks/webserver/server'
import express, {Express, Response, Request, Application, NextFunction } from 'express'
import connectDB from './frameworks/database/mongodb/connection'
import errorHandlingMiddleware from './frameworks/webserver/middlewares/errorHandle'

const app:Application = express()
expressConfig(app)
//connecting mongoDb
connectDB();
const server = http.createServer(app)
router(app)
app.use(errorHandlingMiddleware)
serverConfig(server).startServer()


