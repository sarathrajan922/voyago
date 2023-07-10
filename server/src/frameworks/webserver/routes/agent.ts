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

  router.post("/signup", upload, controller.agentRegister);
  router.post("/login", controller.agentLogin);
  router.post(
    "/category-add",
    agentRoleCheckMiddleware,
    authenticationMiddleware,
    controller.addCategory
  );
  router.get(
    "/get-all-category/:id",
    agentRoleCheckMiddleware,
    authenticationMiddleware,
    controller.getCategory
  );
  router.patch(
    "/delete-category",
    agentRoleCheckMiddleware,
    authenticationMiddleware,
    controller.deleteCategory
  );
  router.post(
    "/add-tour-package",
    agentRoleCheckMiddleware,
    authenticationMiddleware,
    upload,
    controller.addPackage
  );
  router.get(
    "/get-all-package/:id",
    agentRoleCheckMiddleware,
    authenticationMiddleware,
    controller.getAllPackages
  );
  router.get(
    "/get-package/:id",
    agentRoleCheckMiddleware,
    authenticationMiddleware,
    controller.getPackage
  );
  router.patch(
    "/disable-package/:id",
    agentRoleCheckMiddleware,
    authenticationMiddleware,
    controller.disablePackage
  );
  router.put(
    "/update-package/:id",
    agentRoleCheckMiddleware,
    authenticationMiddleware,
    upload,
    controller.updatePackage
  );
  router.put(
    "/delete-package/:id",
    agentRoleCheckMiddleware,
    authenticationMiddleware,
    controller.deletePackage
  );

  return router;
};

export default agentRouter;
