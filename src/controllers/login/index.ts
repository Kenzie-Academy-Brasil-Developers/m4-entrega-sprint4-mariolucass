import { IUserLogin } from "./../../interfaces/users/index";
import * as services from "../../services";
import { Request, Response } from "express";

export const loginUserController = async (req: Request, res: Response) => {
  const data: IUserLogin = req.body;
  const [status, info] = await services.loginUser(data);

  return res.status(status).json(info);
};
