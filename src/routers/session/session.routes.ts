import * as controllers from "../../controllers";
import { Router } from "express";

export const sessionRoutes = Router();

sessionRoutes.post("", controllers.loginUserController);
