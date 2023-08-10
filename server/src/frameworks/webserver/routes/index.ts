import { Application, Request, Response } from "express";
import adminRouter from "./admin";
import agentRouter from "./agent";
import userRouter from "./user";
import paymentRouter from './payment'

const router = (app: Application) => {
  app.use("/api/auth", userRouter());
  app.use("/api/admin", adminRouter());
  app.use("/api/agent", agentRouter());
  app.use('/api/pay', paymentRouter())
};

export default router;
