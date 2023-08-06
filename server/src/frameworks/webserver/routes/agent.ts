import { AuthService, authService } from "../../services/authService";
import { authServiceInterface } from "../../../application/services/authServiceInterface";
import { agentDbRepository } from "../../../application/repository/agentDBrepository";
import { agentRepositoryMongoDB } from "../../database/mongodb/repositories/agentRepoMongoDB";
import agentController from "../../../adapters/controller/agentController";
import express from "express";
import { upload } from "../middlewares/cloudinary";
import authenticationMiddleware from "../middlewares/authenticationMiddleware";
import { agentRoleCheckMiddleware } from "../middlewares/roleCheck";

const agentRouter = () => {
  const router = express.Router();

  const controller = agentController(
    authServiceInterface,
    authService,
    agentDbRepository,
    agentRepositoryMongoDB
  );

  router.post(
    "/signup",
  upload,
  controller.agentRegister);

  router.post(
    "/login",
  controller.agentLogin);

  router.post(
    "/category-add",
    authenticationMiddleware,
    agentRoleCheckMiddleware,
    controller.addCategory
  );
  router.get(
    "/get-all-category",
    authenticationMiddleware,
    agentRoleCheckMiddleware,
    controller.getCategory
  );
  router.patch(
    "/delete-category",
    authenticationMiddleware,
    agentRoleCheckMiddleware,
    controller.deleteCategory
  );
  router.post(
    "/add-tour-package",
    authenticationMiddleware,
    agentRoleCheckMiddleware,
    upload,
    controller.addPackage
  );
  router.get(
    "/get-all-package/",
    authenticationMiddleware,
    agentRoleCheckMiddleware,
    controller.getAllPackages
  );
  router.get(
    "/get-package/:id",
    authenticationMiddleware,
    agentRoleCheckMiddleware,
    controller.getPackage
  );
  router.patch(
    "/disable-package/:id",
    authenticationMiddleware,
    agentRoleCheckMiddleware,
    controller.disablePackage
  );
  router.put(
    "/update-package/:id",
    authenticationMiddleware,
    agentRoleCheckMiddleware,
    upload,
    controller.updatePackage
  );
  router.put(
    "/delete-package/:id",
    authenticationMiddleware,
    agentRoleCheckMiddleware,
    controller.deletePackage
  );

  router.get('/get-all-booking',
  authenticationMiddleware,
  agentRoleCheckMiddleware,
  controller.agentGetAllBooking)

  router.get('/isVerified',
  authenticationMiddleware,
  agentRoleCheckMiddleware,
  controller.checkAgentVerified)

  router.get('/get-profile',
  authenticationMiddleware,
  agentRoleCheckMiddleware,
  controller.getAgentProfile)

 router.put('/agent-profile-update',
 authenticationMiddleware,
 agentRoleCheckMiddleware,
 controller.agentProfileUpdate)


 router.post('/alert-message',
 authenticationMiddleware,
 agentRoleCheckMiddleware,
 controller.paymentAlertMessage)

 router.get('/get-all-bookingStat',
 authenticationMiddleware,
 agentRoleCheckMiddleware,
 controller.getAgentBookingStat);


 router.get('/get-agent-revenue',
 authenticationMiddleware,
 agentRoleCheckMiddleware,
 controller.getRevenue);

 router.get('/get-userCount-successBookingCount',
 authenticationMiddleware,
 agentRoleCheckMiddleware,
 controller.getUserCountAndBookingCount);




  return router;
};


export default agentRouter;
