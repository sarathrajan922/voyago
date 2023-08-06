import express from "express";
import { authService } from "../../services/authService";
import {
  AuthServiceInterface,
  authServiceInterface,
} from "../../../application/services/authServiceInterface";
import { adminDbRepository } from "../../../application/repository/adminDBrepository";
import { adminRepossitoryMongoDB } from "../../database/mongodb/repositories/adminRepoMongoDB";
import adminController from "../../../adapters/controller/adminController";
import authenticationMiddleware from "../middlewares/authenticationMiddleware";
import { adminRoleCheckMiddleware } from "../middlewares/roleCheck";

const adminRouter = () => {
  const router = express.Router();

  const controller = adminController(
    authServiceInterface,
    authService,
    adminDbRepository,
    adminRepossitoryMongoDB
  );

  router.post("/login", controller.adminLogin);
  router.get(
    "/get-all-users",
    authenticationMiddleware,
    adminRoleCheckMiddleware,
    controller.adminGetAllUsers
  );
  router.get(
    "/get-all-agents",
    authenticationMiddleware,
    adminRoleCheckMiddleware,
    controller.adminGetAllAgents
  );
  router.post(
    "/block-user/:id",
    authenticationMiddleware,
    adminRoleCheckMiddleware,
    controller.adminBlockUser
  );
  router.post(
    "/block-agent/:id",
    authenticationMiddleware,
    adminRoleCheckMiddleware,
    controller.adminBlockAgent
  );
  router.get(
    "/get-all-unverified-agents",
    authenticationMiddleware,
    adminRoleCheckMiddleware,
    controller.getUnverifiedAgents
  );
  router.post(
    "/agent-verification/:id",
    authenticationMiddleware,
    adminRoleCheckMiddleware,
    controller.verifyAgent
  );

  router.get(
    '/get-basic-details-user-agent',
    authenticationMiddleware,adminRoleCheckMiddleware,controller.BasicDetailsUserAgentPackageBooking

  );

  router.get(
    '/get-all-agents-status',
    authenticationMiddleware,adminRoleCheckMiddleware,controller.getAgentsStatus
  )

  router.get(
    '/get-all-booking-stat',
    authenticationMiddleware,adminRoleCheckMiddleware,controller.getAllBookingStat
  )

  router.get('/get-revenu',authenticationMiddleware,adminRoleCheckMiddleware,controller.getRevenue)


  return router;
};

export default adminRouter;



