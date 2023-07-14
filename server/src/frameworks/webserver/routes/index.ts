import { Application, Request, Response } from "express";
import adminRouter from "./admin";
import agentRouter from "./agent";
import userRouter from "./user";
import paymentRouter from './payment'

const router = (app: Application) => {
  app.use("/auth", userRouter());
  app.use("/admin", adminRouter());
  app.use("/agent", agentRouter());
  app.use('/pay', paymentRouter())
};

export default router;
