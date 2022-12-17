import * as controllers from "../../controllers";
import { Router } from "express";

export const loginRoutes = Router();

loginRoutes.post("", controllers.loginUserController);
