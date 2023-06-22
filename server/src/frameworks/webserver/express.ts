import express, {Application, NextFunction} from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
// const app = express()

const expressConfig = (app: Application)=>{

  app.use(express.json());
  app.use(express.urlencoded({ extended : true}));
  app.use(cookieParser())
  app.use(morgan('dev'))
  app.use(cors())
  
}

export default expressConfig