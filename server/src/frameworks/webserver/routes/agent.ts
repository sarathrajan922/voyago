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
    authenticationMiddleware,
    agentRoleCheckMiddleware,
    controller.addCategory
  );
  router.get(
    "/get-all-category/:id",
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
    "/get-all-package/:id",
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

  return router;
};

export default agentRouter;
