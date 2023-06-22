import { Application ,Request, Response} from "express";
// import userRouter from "./user";
import adminRouter from "./admin";
import agentRouter from "./agent";
import authRouter from "./auth";

const router = (app: Application)=>{
    app.use('/auth', authRouter())
    // app.use('/user', userRouter())
    app.use('/admin', adminRouter())
    app.use('/agent', agentRouter())
}

export default router