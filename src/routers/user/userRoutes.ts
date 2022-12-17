import * as middlewares from "./../../middlewares/";
import * as controllers from "../../controllers";
import { Router } from "express";
import { userCreate, userUpdate } from "../../serializers/user";

export const userRoutes = Router();

userRoutes.post(
  "/",
  middlewares.ensureValidData(userCreate),
  middlewares.ensureUserNotExists,
  controllers.createUserController
);

userRoutes.get(
  "/",
  middlewares.ensureAuthPermissions,
  middlewares.ensureIsAdmin,
  controllers.getUsersController
);

userRoutes.patch(
  "/:id",
  //   middlewares.ensureValidData(userUpdate),
  middlewares.ensureAuthPermissions,
  middlewares.ensureIsUser,
  middlewares.ensureUserExists,
  middlewares.ensureUpdateData,
  controllers.updateUserController
);

userRoutes.delete(
  "/:id",
  middlewares.ensureAuthPermissions,
  middlewares.ensureIsAdmin,
  middlewares.ensureUserExists,
  controllers.deleteUserController
);
