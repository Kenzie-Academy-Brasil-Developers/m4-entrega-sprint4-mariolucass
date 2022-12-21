import * as middlewares from "../../middlewares";
import * as controllers from "../../controllers";
import * as serializers from "../../serializers";
import { Router } from "express";

export const userRoutes = Router();

userRoutes.post(
  "/",
  middlewares.ensureValidData(serializers.userCreateSerializer),
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
  //middlewares.ensureValidData(serializers.userUpdateSerializer),
  middlewares.ensureAuthPermissions,
  middlewares.ensureUserExists,
  middlewares.ensureIsUser,
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
